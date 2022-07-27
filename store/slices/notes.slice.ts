import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

interface NotesDataState {
  value: Note[];
}

// Define the initial state using that type
const initialState: NotesDataState = {
  value: [],
};

export const NotesDataSlice = createSlice({
  name: 'notes',

  initialState: initialState,

  reducers: {
    setNotesData: (
      state: NotesDataState,
      action: PayloadAction<NotesDataState>
    ) => {
      state.value = action.payload.value;
    },
    updateNoteText: (
      state: NotesDataState,
      action: PayloadAction<{ noteId: string; updatedText: string }>
    ) => {
      const noteToBeUpdated = state.value.find(
        (note) => note._id === action.payload.noteId
      );
      if (noteToBeUpdated) {
        noteToBeUpdated.text = action.payload.updatedText;
      }
    },
  },
});

export const { setNotesData, updateNoteText } = NotesDataSlice.actions;

export default NotesDataSlice.reducer;
