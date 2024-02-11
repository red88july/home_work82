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