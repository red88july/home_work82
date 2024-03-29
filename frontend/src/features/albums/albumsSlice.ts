import { createSlice } from '@reduxjs/toolkit';
import { Albums, AlbumsMutation, ValidationError } from '../../types';
import { albumCreate, getAlbums, getAllAlbums } from './albumsThunk.ts';
import { RootState } from '../../app/store.ts';

interface AlbumsState {
  album: AlbumsMutation | null;
  isLoadingDataAlbum: boolean;
  isErrorLoadDataAlbum: ValidationError | null;
  isErrorLoadingAlbums: boolean;
  albums: Albums[];
  albumsAll: Albums[];
  isLoadingAlbum: boolean;
  isLoadingAllAlbums: boolean;
}

const initialState: AlbumsState = {
  album: null,
  isLoadingDataAlbum: false,
  isErrorLoadDataAlbum: null,
  isErrorLoadingAlbums: false,
  albums: [],
  albumsAll: [],
  isLoadingAlbum: false,
  isLoadingAllAlbums: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoadingAlbum = true;
      state.isErrorLoadingAlbums = false;
    });
    builder.addCase(getAlbums.fulfilled, (state, {payload: albums}) => {
      state.isLoadingAlbum = false;
      state.albums = albums;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.isLoadingAlbum = false;
      state.isErrorLoadingAlbums = true;
    });

    builder.addCase(getAllAlbums.pending, (state) => {
      state.isLoadingAllAlbums = true;
    });
    builder.addCase(getAllAlbums.fulfilled, (state, {payload: albumsAll}) => {
      state.isLoadingAllAlbums = false;
      state.albumsAll = albumsAll;
    });
    builder.addCase(getAllAlbums.rejected, (state) => {
      state.isLoadingAllAlbums = false;
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
export const selectAllAlbum = (state:RootState) => state.albums.albumsAll;
export const loadingAlbum = (state: RootState) => state.albums.isLoadingAlbum;
export const isLoadingAlbums = (state:RootState) => state.albums.isLoadingDataAlbum;
export const isErrorLoadAlbums = (state:RootState) => state.albums.isErrorLoadDataAlbum;
export const isErrorGetLoadingAlbums = (state: RootState) => state.albums.isErrorLoadingAlbums;