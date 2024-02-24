import {createSlice} from '@reduxjs/toolkit';
import { Albums } from '../../types';
import {getAlbums} from './albumsThunk.ts';
import {RootState} from '../../app/store.ts';

interface AlbumsState {
  albums: Albums[];
  isLoadingAlbum: boolean;
}

const initialState: AlbumsState = {
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
  }
});

export const albumReducer = albumsSlice.reducer;
export const selectAlbum = (state:RootState) => state.albums.albums;
export const loadingAlbum = (state: RootState) => state.albums.isLoadingAlbum;