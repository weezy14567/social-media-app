import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from '../redux/userSlice';
import currentVideoReducer from '../redux/videoSlice';
import videoLikeReducer from '../redux/videoLikeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import singleVideoReducer from '../redux/singleVideoSlice';
import friendsListReducer from '../redux/friendsSlice';
import notificationReducer from '../redux/notificationSlice';
import conversationIdReducer from './receiverSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userInfoReducer,
  video: currentVideoReducer,
  singleVideo: singleVideoReducer,
  videoLike: videoLikeReducer,
  friends: friendsListReducer,
  notify: notificationReducer,
  receiver: conversationIdReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
