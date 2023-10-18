import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListItem } from '../interface/ListItem';
import moment from 'moment';

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
    alertModalState: false,

    playerlist: [] as IListItem[],
    score: 5,
    chip: 5,
    event_date: moment(new Date()).format('YYYY/MM/DD'),

    gameList: []
  },
  reducers: {
    setModalState(state, action: PayloadAction<boolean>) {
      state.modalState = action.payload;
    },
    setAlertModalState(state, action: PayloadAction<boolean>) {
      state.alertModalState = action.payload;
    },
    setPlayerList(state, action: PayloadAction<IListItem[]>){
      state.playerlist = action.payload;
    },

    setScore(state, action:PayloadAction<number>){
      state.score = action.payload;
    },
    setChip(state, action:PayloadAction<number>){
      state.chip = action.payload;
    },
    setEventDate(state, action:PayloadAction<string>){
      state.event_date = action.payload;
    },
    setGameList(state, action){
      state.gameList = action.payload;
    },
  }
});

export const { 
  setModalState, 
  setAlertModalState,
  setPlayerList, 
  setScore, 
  setChip, 
  setEventDate,
  setGameList
} = golbalSlice.actions;

export default golbalSlice.reducer;
