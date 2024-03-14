export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: File | null;
}

export interface Artists {
  _id: string;
  author: string;
  info: string;
  photo: null | string;
  isPublished: boolean;
}

export interface ArtistsMutation {
  _id: string;
  author: string;
  info: string;
  photo: string | null;
  isPublished: boolean;
}

export interface ArtistsData {
  author: string;
  info: string;
  photo: File | null;
}

export interface Albums {
  _id: string;
  artist: Artists;
  album: string;
  date: number;
  image: null | string;
  isPublished: boolean;
}

export interface AlbumsMutation {
  _id: string;
  album: string;
  artist: string;
  date: number;
  image: string | null;
  isPublished: boolean;
}

export interface UpdateArtist {
  message: string;
  artist: Artists;
}

export interface AlbumsData {
  album: string;
  artist: string;
  date: number;
  image: File | null;
}

export interface UpdateAlbum {
  message: string;
  album: Albums;
}

export interface TracksMutation {
  _id: string;
  track: string;
  album: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface TracksData {
  number: number;
  track: string;
  album: string;
  duration: string;
}

export type AlbumsType = Omit<Albums, 'artist image'>

export interface Tracks {
  _id: string;
  track: string;
  album: AlbumsType;
  duration: number;
  number: number;
  isPublished: boolean;
}

export interface RegistrationMutation {
  displayName: string;
  email: string;
  password: string;
  avatar: File | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegistrationResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  user: User;
  track: string;
}

export interface TracksTypes {
  album: {
    album: string;
    artist: {
      author: string;
    };
  };
  duration: string;
  track: string;
}

export interface TrackDataHistory {
  _id: string;
  user: User;
  track: TracksTypes;
  datetime: string;
}