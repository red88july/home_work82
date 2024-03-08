import { createSlice } from '@reduxjs/toolkit';

import { artistCreate, getAllArtists, getArtists } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';

import { Artists, ArtistsMutation, ValidationError } from '../../types';


interface ArtistsState {
  artist: ArtistsMutation | null;
  isLoadingArtist: boolean;
  isErrorArtist: ValidationError | null;
  artists: Artists[];
  isLoadingArtists: boolean;
  artistsAll: Artists[];
  isLoadingAllArtists: boolean;
}

const initialState: ArtistsState ={
  artist: null,
  isLoadingArtist: false,
  isErrorArtist: null,
  artists: [],
  isLoadingArtists: false,
  artistsAll: [],
  isLoadingAllArtists: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.isLoadingArtists = true;
    });
    builder.addCase(getArtists.fulfilled, (state, {payload: artists}) => {
      state.isLoadingArtists = false;
      state.artists = artists;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.isLoadingArtists = false;
    });

    builder.addCase(getAllArtists.pending, (state) => {
      state.isLoadingAllArtists = true;
    });
    builder.addCase(getAllArtists.fulfilled, (state, {payload: artistsAll}) => {
      state.isLoadingAllArtists = false;
      state.artistsAll = artistsAll;
    });
    builder.addCase(getAllArtists.rejected, (state) => {
      state.isLoadingAllArtists = false;
    });

    builder.addCase(artistCreate.pending, (state) => {
      state.isLoadingArtist = true;
      state.isErrorArtist = null;
    });
    builder.addCase(artistCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingArtist = false;
      state.artist = data;
    });
    builder.addCase(artistCreate.rejected, (state, {payload: error}) => {
      state.isLoadingArtist = false;
      state.isErrorArtist = error || null;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;

export const selectAllArtists = (state: RootState) => state.artists.artistsAll;

export const loadingArtists = (state: RootState) => state.artists.isLoadingArtists;
export const isLoadingArtists = (state: RootState) => state.artists.isLoadingArtist;
export const isErrorLoadArtists = (state: RootState) => state.artists.isErrorArtist;
