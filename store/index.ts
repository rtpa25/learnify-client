import { configureStore } from '@reduxjs/toolkit';
import currentUserReducers from './slices/currentUser.slice';
import currentLearningReducers from './slices/currentLearning.slice';
import youtubeplayerRefReducers from './slices/playerRef.slice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducers,
    currentLearning: currentLearningReducers,
    youtubeplayerRef: youtubeplayerRefReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
