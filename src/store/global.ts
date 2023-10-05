import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
  },
  reducers: {
    setModalState(state, action: PayloadAction<boolean>) {
      state.modalState = action.payload;
    }
  }
});

export const { setModalState } = golbalSlice.actions;
export default golbalSlice.reducer;
