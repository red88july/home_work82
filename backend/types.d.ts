import { Model } from "mongoose";
import User from "./models/User";

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
    number: number;
    track: string;
    album: string;
    duration: string;
}

export interface UserData {
    displayName?: string;
    email: string;
    password: string;
    avatar: string | null;
}

export interface UserDataExtendsSchema extends UserData {
    token: string;
    role: string;
    googleId?: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>

export interface TrackHistoryData {
    user: User;
    track: string;
}