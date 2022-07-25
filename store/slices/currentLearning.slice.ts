import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Learning } from '../../interfaces/learning.interface';

interface CurrentLearningDataState {
  learning: Learning | undefined;
}

// Define the initial state using that type
const initialState: CurrentLearningDataState = {
  learning: undefined,
};

export const CurrentLearningDataSlice = createSlice({
  name: 'currentLearning',

  initialState: initialState,

  reducers: {
    setCurrentLearningData: (
      state: CurrentLearningDataState,
      action: PayloadAction<CurrentLearningDataState>
    ) => {
      state.learning = action.payload.learning;
    },
  },
});

export const { setCurrentLearningData } = CurrentLearningDataSlice.actions;

export default CurrentLearningDataSlice.reducer;
