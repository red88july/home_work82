import mongoose from "mongoose";

import Track from "../models/Track";
import {Router} from "express";
import {TrackData} from "../types";
import auth from "../middleware/auth";

export const tracksRouter = Router();

tracksRouter.post('/', auth, async (req, res, next) => {

    try {

        const trackData: TrackData = {
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

tracksRouter.get('/', async (req, res, next) => {

    try {

        const findParam = await Track.findOne({album: req.query.album});
        let albumQueryParam: { album?: string } = {};

        if (findParam) {
            albumQueryParam.album = req.query.album as string;
        }

        const getTrackData = await Track.find(albumQueryParam).populate({
            path: 'album',
            select: 'album artist',
            populate: {
                path: 'artist', model: 'Artist', select: 'author'
            }
        }).sort({number: 1});

        return res.send(getTrackData);

    } catch (e) {
        next(e);
    }

});