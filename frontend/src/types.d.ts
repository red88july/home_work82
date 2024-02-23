export interface Artists {
  _id: string;
  author: string;
  info: string;
  photo: null | string;
}

export interface Albums {
  _id: string;
  artist: Artists;
  album: string;
  date: number;
  image: null | string;
}

export type AlbumsType = Omit<Albums, 'artist image'>

export interface Tracks {
  _id: string;
  track: string;
  author: string;
  album: AlbumsType;
  duration: number;
  number: number;
}