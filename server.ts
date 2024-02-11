import express from 'express';
import mongoose from "mongoose";

import connectToDB from "./connectToDB";
import { artistsRouter } from "./routers/artists"
import { albumsRouter } from "./routers/albums";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

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