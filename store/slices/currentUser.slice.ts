import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

interface CurrentUserDataState {
  user: User | undefined;
}

// Define the initial state using that type
const initialState: CurrentUserDataState = {
  user: undefined,
};

export const CurrentUserDataSlice = createSlice({
  name: 'currentUser',

  initialState: initialState,

  reducers: {
    setCurrentUserData: (
      state: CurrentUserDataState,
      action: PayloadAction<CurrentUserDataState>
    ) => {
      state.user = action.payload.user;
    },
  },
});

export const { setCurrentUserData } = CurrentUserDataSlice.actions;

export default CurrentUserDataSlice.reducer;
