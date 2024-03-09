import mongoose, {Types} from "mongoose";

import Track from "../models/Track";
import {Router} from "express";
import {TrackData} from "../types";
import auth, {RequestUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import {albumsRouter} from "./albums";
import Artist from "../models/Artist";
import findUser from "../middleware/findUser";

export const tracksRouter = Router();

tracksRouter.post('/', async (req, res, next) => {
    try {
        const trackData: TrackData = {
            number: req.body.number,
            track: req.body.track,
            album: req.body.album,
            duration: req.body.duration,
        }

        const newTrack = new Track(trackData);
        await newTrack.save();

        return res.send(newTrack);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

tracksRouter.get('/', findUser, async (req: RequestUser, res, next) => {
    try {
        let publications;

        if (req.user?.role === 'user') {
            publications = await Track.find({isPublished: true}).sort({number: 1});
        } else {
            let albumQueryParam: { album?: string } = {};

            if (req.query.album) {
                albumQueryParam.album = req.query.album as string;
            }
            publications = await Track.find(albumQueryParam).populate({
                path: 'album',
                select: 'album artist',
                populate: {
                    path: 'artist', model: 'Artist', select: 'author'
                }
            }).sort({number: 1});
        }

        return res.send(publications);
    } catch (e) {
        next(e);
    }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req: RequestUser, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const track = await Track.findByIdAndDelete(_id);

        if (!track) {
            return res.status(404).send({error: 'Not Found!'});
        }

        return res.send({message: 'Track successfully deleted', track});
    } catch (e) {
        next(e);
    }
})

tracksRouter.patch(`/:id/togglePublished`, auth, permit('admin'), async (req: RequestUser, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const track = await Track.findById(_id);

        if (!track) {
            return res.status(404).send({error: 'Track not found!'});
        }

        track.isPublished = !track.isPublished
        await track.save();

        return res.send({message: 'Track successfully patched', track});
    } catch (e) {
        next(e);
    }
})