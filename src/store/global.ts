import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListItem } from '../interface/listItem';

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
    playerlist: [] as ListItem[]
  },
  reducers: {
    setModalState(state, action: PayloadAction<boolean>) {
      state.modalState = action.payload;
    },
    setPlayerList(state, action: PayloadAction<ListItem[]>){
      state.playerlist = action.payload
    }
  }
});

export const { setModalState, setPlayerList } = golbalSlice.actions;
export default golbalSlice.reducer;
