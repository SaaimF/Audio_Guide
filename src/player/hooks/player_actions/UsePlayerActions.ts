import {useEffect} from 'react';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {useAppDispatch, useAppSelector} from "../../../redux/config/ReduxConfig";
import {PlayerSheetState, setPlayerSheetState} from "../../../redux/reducers/player_reducer/PlayerReducer";
import {UsePlayerEffectsProps} from "./UsePlayerActionsProps";

const usePlayerActions = ({ sheetRef, playbackState }: UsePlayerEffectsProps) => {
  const dispatch = useAppDispatch();
  const playerState = useAppSelector(state => state.player);

  useEffect(() => {
    if (playerState.trackUrl?.length > 0 && playerState.trackUrl !== 'https:') {
      TrackPlayer.getActiveTrack()
        .then(track => track?.url)
        .then(url => {
          if (url !== playerState.trackUrl) {
            TrackPlayer.setQueue([
              {
                id: '1',
                url: playerState.trackUrl,
                title: playerState.trackName,
                artist: playerState.trackAuthor,
              }
            ])
              .then(() => TrackPlayer.setRepeatMode(RepeatMode.Track))
              .then(() => console.log('Track was updated'));
          }
        });
    }
  }, [playerState.trackUrl]);

  useEffect(() => {
    if (!sheetRef.current) {
      return
    }

    try {
      if (playerState.playerSheetState === PlayerSheetState.ROLLED_UP) {
        sheetRef.current.snapToIndex(0);
      }
      if (playerState.playerSheetState === PlayerSheetState.OPENED) {
        sheetRef.current.snapToIndex(1);
      }
    } catch (e) {
      // ignored
    }
  }, [playerState.playerSheetState, sheetRef]);

  const togglePlaybackState = () => {
    if (playerState && playbackState?.state !== 'buffering') {
      if (playbackState?.state === 'playing') {
        TrackPlayer.pause()
      } else {
        TrackPlayer.play()
      }
    }
  }

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      dispatch(setPlayerSheetState(PlayerSheetState.ROLLED_UP));
    }
    if (index === 1) {
      dispatch(setPlayerSheetState(PlayerSheetState.OPENED));
    }
  }

  return {
    togglePlaybackState,
    handleSheetChanges,
  };
};

export default usePlayerActions;
