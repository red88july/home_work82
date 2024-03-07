import mongoose, {Types} from "mongoose";
import {Router} from 'express';

import Album from "../models/Album";
import {imageUpload} from "../multer";
import {AlbumData} from "../types";
import auth, {RequestUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Artist from "../models/Artist";
import {artistsRouter} from "./artists";
import findUser from "../middleware/findUser";

export const albumsRouter = Router();

albumsRouter.post('/', auth, imageUpload.single('image'), async (req, res, next) => {

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

albumsRouter.get('/', findUser, async (req: RequestUser, res, next) => {
    try {
        let publications;

        if (req.user?.role === 'user') {
            publications = await Album.find({ isPublished: true }).sort({ date: -1 });
        } else {
            let query: { artist?: string } = {};
            if (req.query.artist) {
                query.artist = req.query.artist as string;
            }
            publications = await Album.find(query).populate('artist', 'album author').sort({ date: -1 });
        }

        return res.send(publications);
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


albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestUser, res, next) => {

    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const album = await Album.findByIdAndDelete(_id);

        if (!album) {
            return res.status(404).send({error: 'Not Found!'});
        }

        return res.send({message: 'Album successfully deleted', album});

    } catch (e) {
        next(e);
    }

})

albumsRouter.patch(`/:id/togglePublished`, auth, permit('admin'), async (req: RequestUser, res, next) => {


    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const album = await Album.findById(_id);

        if (!album) {
            return res.status(404).send({error: 'Album not found!'});
        }

        album.isPublished = !album.isPublished

        await album.save();

        return res.send({message: 'Album successfully patched', album});

    } catch (e) {
        next(e);
    }

})