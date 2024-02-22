export interface Artists {
  _id: string;
  author: string;
  photo: null | string;
}

export interface Albums {
  _id: string;
  artist: Artists;
  album: string;
  date: number;
  image: null | string;
}