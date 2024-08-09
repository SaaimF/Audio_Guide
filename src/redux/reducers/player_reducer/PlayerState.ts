import {PlayerSheetState} from "./PlayerReducer";

export interface PlayerState {
  playerSheetState: PlayerSheetState;
  trackUrl: string;
  trackName: string;
  trackAuthor: string;
}
