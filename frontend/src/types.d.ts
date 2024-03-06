export interface Artists {
  _id: string;
  author: string;
  info: string;
  photo: null | string;
  isPublished: boolean;
}

export interface Albums {
  _id: string;
  artist: Artists;
  album: string;
  date: number;
  image: null | string;
  isPublished: boolean;
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

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegistrationMutation {
  username: string;
  password: string;
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
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
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