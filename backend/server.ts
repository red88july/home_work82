import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import connectToDB from "./connectToDB";

import { artistsRouter } from "./routers/artists"
import { albumsRouter } from "./routers/albums";
import { tracksRouter } from "./routers/tracks";
import { usersRouter } from "./routers/users";
import { trackHistory } from "./routers/trackHistory";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistory);

const run = async () => {

    await mongoose.connect(connectToDB.db);

    app.listen(port, () => {
        console.log(`Server is running on ${port}!`);
    })

    process.on('exit', ()=> {
        mongoose.disconnect();
    });

}

void run();