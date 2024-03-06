import {combineReducers, configureStore} from '@reduxjs/toolkit';

import { artistsReducer } from '../features/artists/artistsSlice.ts';
import { albumReducer } from '../features/albums/albumsSlice.ts';
import {tracksReducer} from '../features/tracks/tracksSlice.ts';
import {usersReducer} from '../features/users/usersSlice.ts';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import {tracksHistoryReducer} from '../features/TrackStory/tracksHistorySlice.ts';

const usersPersistConfig = {
  key: 'music:users',
  storage: storage,
  whitelist: ['usersLog'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;