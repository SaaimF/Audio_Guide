import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {PlaybackState} from "react-native-track-player";

export interface UsePlayerEffectsProps {
  sheetRef: React.RefObject<BottomSheet>;
  playbackState: PlaybackState | { state: undefined; };
}
