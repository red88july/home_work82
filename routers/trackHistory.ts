import mongoose from "mongoose";
import { Router } from 'express';

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