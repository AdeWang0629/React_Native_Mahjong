import { createSlice, PayloadAction, createAction, AnyAction } from '@reduxjs/toolkit';
import { IListItem } from '../interface/ListItem';
import moment from 'moment';

const golbalSlice = createSlice({
  name: 'global',
  initialState: {
    modalState: false,
    alertModalState: false,

    playerlist: [] as IListItem[],
    players: [] as IListItem[],
    scoreRate: 20,
    chipRate: 5,
    event_date: moment(new Date()).format('YYYY/MM/DD'),

    gameList: [],

    Grows: Array.from({ length: 20 }, () => ['']),
    Gtotal_score: [],
    GconvertedAmount: [],
    GchipNumber: [],
    GchipMoney: [],

    currentScore: {chip:0,score:0,event_date: '',players:[],id:0,},
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
      state.scoreRate = action.payload;
    },
    setChip(state, action:PayloadAction<number>){
      state.chipRate = action.payload;
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

    setCurrentScore(state, action){
      state.currentScore = action.payload
    },
    setPlayers(state, action: PayloadAction<IListItem[]>){
      state.players = action.payload;
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
  setChipMoney,
  setCurrentScore,
  setPlayers
} = golbalSlice.actions;

export default golbalSlice.reducer;