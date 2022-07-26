import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface YouTubePlayerRefState {
  playerRef: any;
}

// Define the initial state using that type
const initialState: YouTubePlayerRefState = {
  playerRef: undefined,
};

export const YouTubePlayerRefSlice = createSlice({
  name: 'playerRef',

  initialState: initialState,

  reducers: {
    setYouTubePlayerRef: (
      state: YouTubePlayerRefState,
      action: PayloadAction<YouTubePlayerRefState>
    ) => {
      state.playerRef = action.payload.playerRef;
    },
  },
});

export const { setYouTubePlayerRef } = YouTubePlayerRefSlice.actions;

export default YouTubePlayerRefSlice.reducer;
