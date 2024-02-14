import {Model, Schema} from "mongoose";

export interface ArtistData {
    author: string;
    photo: string | null;
    info: string;
}

export interface AlbumData {
    album: string;
    artist: string;
    date: number;
    image: string | null;
}

export interface TrackData {
    track: string;
    album: string;
    duration: string;
}

export interface UserData {
    username: string;
    password: string;
}

export interface UserDataExtendsSchema extends UserData{
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>

export interface TrackHistoryPost {
    user: string;
    track: string;
}

export interface TrackHistoryData {
    user: Schema.Types.ObjectId;
    track: string;
}