export interface ArtistData {
    author: string;
    photo: string | null;
    info: string;
}

export interface AlbumData {
    name: string;
    artist: string;
    date: number;
    image: string | null;
}

export interface ArtistQuery {
    artist: string | null;
}