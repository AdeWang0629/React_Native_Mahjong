import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messageasd',
  initialState: {
    messageasd111: 'Initial message',
    messageasd123: 'KangIlBong'
  },
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.messageasd111 = action.payload;
    }
  }
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
