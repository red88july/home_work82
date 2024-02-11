import {Schema, model} from "mongoose";

const ArtistSchema = new Schema({

    author: {
        type: String,
        required: true,
        unique: true,
    },

    photo: String,

    info: String,

}, { versionKey: false });

const Artist = model('Artist', ArtistSchema);

export default Artist;