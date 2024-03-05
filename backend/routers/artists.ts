import mongoose from "mongoose";
import { Router } from 'express';

import Artist from "../models/Artist";
import { imageUpload } from "../multer";
import { ArtistData } from "../types";
import auth from "../middleware/auth";

export const artistsRouter = Router();

artistsRouter.post('/', auth, imageUpload.single('photo'), async (req, res, next) => {

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

artistsRouter.get('/', async (_req, res, next) => {

    try {

        const getArtistData = await Artist.find();
        return res.send(getArtistData);

    } catch (e) {
        next(e);
    }

})