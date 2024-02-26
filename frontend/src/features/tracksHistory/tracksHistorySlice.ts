import { createSlice } from '@reduxjs/toolkit';
import {GlobalError, TrackDataHistory, User} from '../../types';
import {historyGetTrack, historyPostTrack} from './tracksHistoryThunk.ts';
import {RootState} from '../../app/store.ts';

interface TracksHistoryState {
  tracks: User | null;
  historyTrack: TrackDataHistory [];
  trackHistoryLoad: boolean;
  trackHistoryError: GlobalError | null;
  getHistoryLoading: boolean;
  getHistoryError: GlobalError | null;
}

const initialState: TracksHistoryState = {
  tracks: null,
  historyTrack: [],
  trackHistoryLoad: false,
  trackHistoryError: null,
  getHistoryLoading: false,
  getHistoryError: null,
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
      state.getHistoryError = null;
    });
    builder.addCase(historyGetTrack.fulfilled, (state, {payload: data}) => {
      state.getHistoryLoading = false;
      state.historyTrack = data;
    });
    builder.addCase(historyGetTrack.rejected, (state, {payload: error}) => {
      state.getHistoryLoading = false;
      state.getHistoryError = error || null;
    });

  }
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectHistoryTracks = (state: RootState) => state.tracksHistory.historyTrack;

