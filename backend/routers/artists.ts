import mongoose, {Types} from "mongoose";
import { Router } from 'express';

import permit from "../middleware/permit";
import findUser from "../middleware/findUser";
import auth, {RequestUser} from "../middleware/auth";

import Artist from "../models/Artist";
import { imageUpload } from "../multer";
import { ArtistData } from "../types";

export const artistsRouter = Router();

artistsRouter.post('/', imageUpload.single('photo'), async (req, res, next) => {
    try {
        const artistData: ArtistData = {
            author: req.body.author,
            photo: req.file ? req.file.filename : null,
            info: req.body.info,
        }

        const artist = new Artist(artistData);
        await artist.save();

        return res.send(artist);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});


artistsRouter.get('/', findUser, async (req: RequestUser, res, next) => {
    try {
        let publications;

        if (req.user?.role === 'user') {
            publications = await Artist.find({isPublished: true});
        } else {
            publications = await Artist.find();
        }

        return res.send(publications);

    } catch (e) {
        next(e);
    }
});

artistsRouter.get('/get-artist', findUser, async (req: RequestUser, res, next) => {
    try {
        let publications;

        if (req.user?.role === 'user') {
            publications = await Artist.find({isPublished: true});
        } else {
            publications = await Artist.find();
        }

        return res.send(publications);

    } catch (e) {
        next(e);
    }
});


artistsRouter.patch(`/:id/togglePublished`, auth, permit('admin'), async (req: RequestUser, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const artist = await Artist.findById(_id);

        if (!artist) {
            return res.status(404).send({error: 'Artist not found!'});
        }

        artist.isPublished = !artist.isPublished
        await artist.save();

        return res.send({message: 'Artist successfully patched', artist});
    } catch (e) {
        next(e);
    }
})

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestUser, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const artist = await Artist.findByIdAndDelete(_id);

        if (!artist) {
            return res.status(404).send({error: 'Not Found!'});
        }

        return res.send({message: 'Artist successfully deleted', artist});

    } catch (e) {
        next(e);
    }
})