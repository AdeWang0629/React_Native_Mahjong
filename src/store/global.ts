import { createSlice, PayloadAction, createAction, AnyAction } from '@reduxjs/toolkit';
import { IListItem } from '../interface/ListItem';
import moment from 'moment';

const Cdate = new Date();
const options = { timeZone: 'Asia/Tokyo' };
const japaneseTime = Cdate.toLocaleString('ja-JP', options);

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
    alertModalState: false,

    playerlist: [] as IListItem[],
    score: 5,
    chip: 5,
    event_date: moment(new Date()).format('YYYY/MM/DD'),

    gameList: [],

    Grows: Array.from({ length: 20 }, () => ['']),
    Gtotal_score: [],
    GconvertedAmount: [],
    GchipNumber: [],
    GchipMoney: []
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

    setRows(state, action){
      state.Grows = action.payload
    },
    setTotalScore(state, action){
      state.Gtotal_score = action.payload
    },
    setConvertedAmount(state, action){
      state.GconvertedAmount = action.payload
    },
    setChipNumber(state, action){
      state.GchipNumber = action.payload
    },
    setChipMoney(state, action){
      state.GchipMoney = action.payload
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
  setGameList,
  setRows,
  setTotalScore,
  setConvertedAmount,
  setChipNumber,
  setChipMoney
} = golbalSlice.actions;

export default golbalSlice.reducer;

// export const setRows = createAction<any>('setTotalScore');
// export const setTotalScore = createAction<any>('setTotalScore');
// export const setConvertedAmount = createAction<any>('setConvertedAmount');
// export const setChipNumber = createAction<any>('setChipNumber');
// export const setChipMoney = createAction<any>('setChipMoney');