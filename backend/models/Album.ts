import { Schema, model, Types } from "mongoose";

import Artist from "./Artist";

const AlbumSchema = new Schema({

    album: {
        type: String,
        required: true,
        unique: true,
    },

    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
          validator: async (value: Types.ObjectId)=> {
              const artistNew = await Artist.findById(value);
              return Boolean(artistNew);
          },
          message: `Artist not specified!`,
        },
    },

    date: {
        type: Number,
        required: true,
    },

    image: String,

    isPublished: {
        type: Boolean,
        default: false,
    },

}, { versionKey: false });

const Album = model('Album', AlbumSchema);

export default Album;