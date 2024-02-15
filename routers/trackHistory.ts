import mongoose from "mongoose";
import { Router } from 'express';

import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import { TrackHistoryData } from "../types";

export const trackHistory = Router();

trackHistory.post('/', async (req, res, next) => {

    try {

       const headerValue = req.get( 'Authorization' );

       if (!headerValue) {
           return res.status(401).send({error: `No authorization header value!`})
       }

       const [_bearer, token] = headerValue.split(' ');

       const user = await User.findOne({token});

       if (!user) {
           return res.status(401).send({error: `Wrong token!`});
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