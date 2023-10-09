import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListItem } from '../interface/ListItem';

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
    playerlist: [] as IListItem[]
  },
  reducers: {
    setModalState(state, action: PayloadAction<boolean>) {
      state.modalState = action.payload;
    },
    setPlayerList(state, action: PayloadAction<IListItem[]>){
      state.playerlist = action.payload
    }
  }
});

export const { setModalState, setPlayerList } = golbalSlice.actions;
export default golbalSlice.reducer;
