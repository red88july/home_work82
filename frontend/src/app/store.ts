import { configureStore } from '@reduxjs/toolkit';

import { artistsReducer } from '../containers/artists/artistsSlice.ts';
import { albumReducer } from '../containers/albums/albumsSlice.ts';
import {tracksReducer} from '../containers/tracks/tracksSlice.ts';
import {usersReducer} from '../containers/users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumReducer,
    tracks: tracksReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
