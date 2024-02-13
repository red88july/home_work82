import mongoose from "mongoose";
import { Router } from 'express';

import User from "../models/User";
import { UserData } from "../types";

export const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
   try {

       const userData: UserData = {
           username: req.body.username,
           password: req.body.password,
       };

       const newUser = new User(userData);
       newUser.generatedToken();
       await newUser.save();

       return res.send(newUser);

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }
       next(e);
   }
});