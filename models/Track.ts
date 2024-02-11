import {Schema, model, Types} from "mongoose";
import Album from "./Album";

const TrackSchema = new Schema({
    track: {
        type: String,
        required: true,
        unique: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId)=> {
                const album  = await Album.findById(value);
                return Boolean(album);
            },
            message: 'Album not specified!',
        }
    },
    duration: {
        type: String,
        required: true,
    }
});

const Track = model('Track', TrackSchema);
export default Track;