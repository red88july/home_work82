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
  album: AlbumsType;
  duration: number;
  number: number;
}

export interface User {
  _id: string;
  username: string;
  token: string;
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
    album: string
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