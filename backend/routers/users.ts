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

       return res.send({message: 'User is correctly registered!', newUser});

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }
       next(e);
   }
   
});

usersRouter.post('/sessions', async (req, res ,next) => {

    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(422).send({message: `Username not found`});
        }

        const checkPass = await user.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Password is wrong!`});
        }

        user.generatedToken();
        await user.save();

        return res.send({ message: 'Username and password are correct!', user });


    } catch (e) {
        next(e);
    }

})
