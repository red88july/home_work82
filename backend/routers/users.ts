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

       return res.send({message: 'Ok!', newUser});

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }
       next(e);
   }
   
});

usersRouter.post('/sessions', async (req, res ,next) => {

    try {
        const username = await User.findOne({username: req.body.username});

        if (!username) {
            return res.status(422).send({message: `Username not found`});
        }

        const checkPass = await username.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Password not found`});
        }

        username.generatedToken();
        await username.save();

        res.send(username);
    } catch (e) {
        next(e);
    }

})