import { createSlice } from '@reduxjs/toolkit';
import { historyGetTrack, historyPostTrack } from './tracksHistoryThunk.ts';

import { GlobalError, TrackDataHistory, User } from '../../types';
import { RootState } from '../../app/store.ts';

interface TracksHistoryState {
  tracks: User | null;
  historyTrack: TrackDataHistory [];
  trackHistoryLoad: boolean;
  trackHistoryError: GlobalError | null;
  getHistoryLoading: boolean;
}

const initialState: TracksHistoryState = {
  tracks: null,
  historyTrack: [],
  trackHistoryLoad: false,
  trackHistoryError: null,
  getHistoryLoading: false,
};

export const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(historyPostTrack.pending, (state) => {
      state.trackHistoryLoad = true;
      state.trackHistoryError = null;
    });
    builder.addCase(historyPostTrack.fulfilled, (state, {payload: data}) => {
      state.trackHistoryLoad = false;
      state.tracks = data.user;
    });
    builder.addCase(historyPostTrack.rejected, (state, {payload: error}) => {
      state.trackHistoryLoad = false;
      state.trackHistoryError = error || null;
    });

    builder.addCase(historyGetTrack.pending, (state) => {
      state.getHistoryLoading = true;
    });
    builder.addCase(historyGetTrack.fulfilled, (state, {payload: data}) => {
      state.getHistoryLoading = false;
      state.historyTrack = data;
    });
    builder.addCase(historyGetTrack.rejected, (state) => {
      state.getHistoryLoading = false;
    });
  }
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectHistoryTracks = (state: RootState) => state.tracksHistory.historyTrack;
export const errorPostTrack = (state: RootState) => state.tracksHistory.trackHistoryError;
export const loadingTrackHistory = (state: RootState) => state.tracksHistory.getHistoryLoading;