import mongoose from "mongoose";
import {Router} from 'express';

import TrackHistory from "../models/TrackHistory";
import auth, {RequestUser} from "../middleware/auth";
import {TrackHistoryData} from "../types";


export const trackHistory = Router();

trackHistory.post('/', auth, async (req: RequestUser, res, next) => {

    try {

        const historyData: TrackHistoryData = {
            user: req.user,
            track: req.body.track,
        };

        const trackHistory = new TrackHistory(historyData);
        await trackHistory.save();

        res.send(trackHistory);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});

trackHistory.get('/', auth, async (req: RequestUser, res, next) => {
    try {

        if (!req.user) {
            return res.status(422).send({error: "History tracks by user listening not found!"});
        }

        const trackHistory = await TrackHistory.find({user: req.user})
            .populate(
                {
                    path: 'track',
                    select: 'track duration album',
                    populate: {
                        path: "album",
                        model: "Album",
                        select: "album",}
            }).sort({datetime: -1});
        return res.send(trackHistory);

    } catch (e) {
        next(e);
    }
});