import mongoose from "mongoose";
import {Router} from 'express';
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryData} from "../types";

export const trackHistory = Router();

trackHistory.post('/', async (req, res, next) => {
   try {
       const token = req.get( 'Authorization' );

       if (!token) {
           return res.status(401).send({error: `No token present!`})
       }

       const user = await User.findOne({token});

       if (!user) {
           return res.status(401).send({error: `Wrong token!`})
       }

       const historyData: TrackHistoryData = {
           user: user,
           track: req.body.track,
       };

       const trackHistory = new TrackHistory(historyData);
       await trackHistory.save();

       res.send(trackHistory);
   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }
       next(e)
   }
});