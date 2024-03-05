import { Schema, model, Types } from "mongoose";

import Album from "./Album";

const TrackSchema = new Schema({

    track: {
        type: String,
        required: true,
    },

    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const albumNew = await Album.findById(value);
                return Boolean(albumNew);
            },
            message: 'AlbumsList not specified!',
        },
    },

    duration: {
        type: String,
    },

    number: {
        type: Number,
        required: true,
    },

    isPublished: {
        type: Boolean,
        default: false,
    },


}, {versionKey: false});

const Track = model('Track', TrackSchema);

export default Track;