import mongoose from "mongoose";
import { Router } from 'express';
import { OAuth2Client } from "google-auth-library";

import User from "../models/User";
import { UserData } from "../types";
import {imageUpload} from "../multer";
import connectToDB from "../connectToDB";
import crypto from "crypto";

export const usersRouter = Router();

const client = new OAuth2Client(connectToDB.google.clientId);

usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
   try {
       const userData: UserData = {
           displayName: req.body.displayName,
           email: req.body.email,
           password: req.body.password,
           avatar: req.file ? req.file.filename : null,
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
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(422).send({message: `Email by user not found`});
        }

        const checkPass = await user.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Password is wrong!`});
        }

        user.generatedToken();
        await user.save();

        return res.send({ message: 'Email and password are correct!', user });
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: connectToDB.google.clientId,
        })

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Google login error!'});
        }
        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];

        if (!email) {
            return res.status(400).send({error: 'Email is not present!'});
        }

        let user = await User.findOne({googleId: id});

        if (!user) {
            user = new User({
                email,
                password: crypto.randomUUID(),
                googleId: id,
                displayName,
            });
        }

        user.generatedToken();

        await user.save();

        return res.send({message: 'Login with Google successfully', user});

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(error);
        }

        next(error);
    }
});


usersRouter.delete('/sessions', async (req, res ,next) => {
    try {
        const message = {message: 'Success!'};

        const headerValue = req.get('Authorization');

        if(!headerValue) {
            return res.send(message);
        }

        const [_bearer, token] = headerValue.split(' ');

        const user = await User.findOne({token});

        if(!user) {
            return res.send(message);
        }

        user.generatedToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
})