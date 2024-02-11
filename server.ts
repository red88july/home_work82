import express from 'express';
import mongoose from "mongoose";

import connectToDB from "./connectToDB";
import { artistsRouter } from "./routers/artists"
import { albumsRouter } from "./routers/albums";
import { tracksRouter } from "./routers/tracks";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

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