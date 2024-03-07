import {createSlice} from '@reduxjs/toolkit';
import {Albums, AlbumsMutation, ValidationError} from '../../types';
import {albumCreate, getAlbums} from './albumsThunk.ts';
import {RootState} from '../../app/store.ts';

interface AlbumsState {

  album: AlbumsMutation | null;

  isLoadingDataAlbum: boolean;
  isErrorLoadDataAlbum: ValidationError | null;

  albums: Albums[];
  isLoadingAlbum: boolean;
}

const initialState: AlbumsState = {
  album: null,

  isLoadingDataAlbum: false,
  isErrorLoadDataAlbum: null,

  albums: [],
  isLoadingAlbum: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoadingAlbum = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, {payload: albums}) => {
      state.isLoadingAlbum = false;
      state.albums = albums;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.isLoadingAlbum = false;
    });

    builder.addCase(albumCreate.pending, (state) => {
      state.isLoadingDataAlbum = true;
      state.isErrorLoadDataAlbum = null;
    });
    builder.addCase(albumCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingDataAlbum = false;
      state.album = data;
    });
    builder.addCase(albumCreate.rejected, (state, {payload: error}) => {
      state.isLoadingDataAlbum = false;
      state.isErrorLoadDataAlbum = error || null;
    });
  }
});

export const albumReducer = albumsSlice.reducer;
export const selectAlbum = (state:RootState) => state.albums.albums;
export const loadingAlbum = (state: RootState) => state.albums.isLoadingAlbum;

export const isLoadingAlbums = (state:RootState) => state.albums.isLoadingDataAlbum;
export const isErrorLoadAlbums = (state:RootState) => state.albums.isErrorLoadDataAlbum;