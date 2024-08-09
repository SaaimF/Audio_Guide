import {PlayerState} from "./PlayerState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum PlayerSheetState {
  CLOSED = 'CLOSED',
  ROLLED_UP = 'ROLLED_UP',
  OPENED = 'OPENED'
}

const initialState: PlayerState = {
  playerSheetState: PlayerSheetState.CLOSED,
  trackUrl: '',
  trackName: '',
  trackAuthor: '',
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerSheetState(state, action: PayloadAction<PlayerSheetState>) {
      state.playerSheetState = action.payload;
    },
    setPlayerState(state, action: PayloadAction<PlayerState>) {
      state = action.payload
      return action.payload
    },
  },
});

export const {
  setPlayerSheetState,
  setPlayerState
} = playerSlice.actions;

export default playerSlice.reducer;
