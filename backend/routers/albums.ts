import mongoose, { Types } from "mongoose";
import { Router } from 'express';

import Album from "../models/Album";
import { imageUpload } from "../multer";
import { AlbumData } from "../types";

export const albumsRouter = Router();

albumsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {

    try {

        const albumData: AlbumData = {
            album: req.body.album,
            artist: req.body.artist,
            date: req.body.date,
            image: req.file ? req.file.filename : null,
        }

        const newAlbum = new Album(albumData);
        await newAlbum.save();

        return res.send(newAlbum);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.send(422).send();
        }
        next(e);
    }

});

albumsRouter.get('/', async (req, res, next) => {

    try {

        const queryParam = await Album.findOne({artist: req.query.artist});
        let query: { artist? : string } = {};

        if (queryParam) {
            query.artist = req.query.artist as string;
        }

        const getAlbumData = await Album.find(query).populate('artist', 'album author').sort({date: -1});

        return res.send(getAlbumData);
    } catch (e) {
        next(e);
    }

});

albumsRouter.get('/:id', async (req, res, next) => {

    try {

        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({error: 'Wrong ObjectId'});
        }

        const album = await Album.findById(_id).populate('artist');

        if (!album) {
            return res.status(404).send({error: 'AlbumsList not found!'});
        }

        return res.send(album);

    } catch (e) {
        next(e);
    }

});