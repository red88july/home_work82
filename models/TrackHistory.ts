import {Schema, Types, model, Date} from "mongoose";
import User from "./User";
import Track from "./Track";
import {HistoryTrackMethods} from "../types";

const TrackHistorySchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            }
        }
    },

    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const track = await Track.findById(value);
                return Boolean(track);
            }
        }
    },

    datetime: {
        type: Date,
        default: () => new Date(),
    }

});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;