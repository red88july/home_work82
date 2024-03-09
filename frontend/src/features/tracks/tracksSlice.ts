import { createSlice } from '@reduxjs/toolkit';
import { getTracks, trackCreate } from './tracksThunk.ts';

import { RootState } from '../../app/store.ts';
import { Tracks, TracksMutation, ValidationError} from '../../types';

interface TracksState {
  track: TracksMutation | null;
  isLoadingTrack: boolean;
  isErrorTrack: ValidationError | null;
  tracks: Tracks[];
  isLoadingTracks: boolean;
}

const initialState: TracksState ={
  track: null,
  isLoadingTrack: false,
  isErrorTrack: null,
  tracks: [],
  isLoadingTracks: false,
};

export const tracksSlice =createSlice({
  name: 'tracks',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.isLoadingTracks = true;
    });
    builder.addCase(getTracks.fulfilled, (state, {payload: tracks}) => {
      state.isLoadingTracks = false;
      state.tracks = tracks;
    });
    builder.addCase(getTracks.rejected, (state) => {
      state.isLoadingTracks = false;
    });

    builder.addCase(trackCreate.pending, (state) => {
      state.isLoadingTrack = true;
      state.isErrorTrack = null;
    });
    builder.addCase(trackCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingTrack = false;
      state.track = data;
    });
    builder.addCase(trackCreate.rejected, (state, {payload: error}) => {
      state.isLoadingTrack = false;
      state.isErrorTrack = error || null;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state:RootState) => state.tracks.tracks;
export const loadingTracks = (state:RootState) => state.tracks.isLoadingTracks;
export const isLoadingTracks = (state:RootState) => state.tracks.isLoadingTrack;
export const isErrorLoadTracks = (state:RootState) => state.tracks.isErrorTrack;