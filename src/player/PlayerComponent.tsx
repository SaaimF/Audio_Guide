import React, {useMemo, useRef, useState} from "react";
import {Dimensions, Platform, StyleSheet, Text, View} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {BrandColors, MainColors} from "../constants/styles/Colors";
import Animated, {useSharedValue} from "react-native-reanimated";
import Ripple from "react-native-material-ripple";
import {FontStyles} from "../constants/styles/Fonts";
import TrackPlayer, {usePlaybackState, useProgress} from "react-native-track-player";
import * as Progress from 'react-native-progress'
import Slider from "@react-native-community/slider";
import {PlayerSheetState, setPlayerSheetState} from "../redux/reducers/player_reducer/PlayerReducer";
import {useAppDispatch, useAppSelector} from "../redux/config/ReduxConfig";
import LeftSeekIcon from "./assets/opened/LeftSeekIcon";
import RightSeekIcon from "./assets/opened/RightSeekIcon";
import PausedStateRolledUpIcon from "./assets/rolled_up/PausedStateRolledUpIcon";
import PlayingStateRolledUpIcon from "./assets/rolled_up/PlayingStateRolledUpIcon";
import PlayingStateOpenedIcon from "./assets/opened/PlayingStateOpenedIcon";
import PausedStateOpenedIcon from "./assets/opened/PausedStateOpenedIcon";
import PlayerHandleComponent from "./assets/shared/PlayerHandleComponent";
import CloseIconRolledUp from "./assets/rolled_up/CloseIconRolledUp";
import {formatTime, formatTrackName} from "./actions/PlayerActions";
import usePlayerStyles from "./hooks/player_styles/UsePlayerStyles";
import usePlayerActions from "./hooks/player_actions/UsePlayerActions";

// constants
const SCREEN_WIDTH = Dimensions.get('screen').width
const OPENED_HEIGHT = Platform.OS === 'ios' ? 240 : 220;
const ROLLED_UP_HEIGHT = Platform.OS === 'ios' ? 84 : 64;

const PlayerComponent: React.FC = () => {
  // player
  const playerState = useAppSelector(state=> state.player)
  const [seekState, setSeekState] = useState({
    inProgress: false,
    position: 0,
  })
  const playbackState = usePlaybackState()
  const progress = useProgress()

  // player modal
  const dispatch = useAppDispatch()
  const sheetRef = useRef<BottomSheet>(null)
  const animatedPosition = useSharedValue(0);
  const [isModalUnlocked, setModalUnlocked] = useState(true)

  const formattedPositionTime = useMemo(() => {
    return seekState.inProgress ? formatTime(seekState.position) : formatTime(progress.position)
  }, [progress.position, seekState]);
  const formattedDurationTime = useMemo(() => {
    return formatTime(progress.duration)
  }, [progress.duration]);
  const formattedRolledUpTrackName = useMemo(() => {
    return formatTrackName(playerState.trackName, 20)
  }, [playerState.trackName]);
  const formattedOpenedTrackName = useMemo(() => {
    return formatTrackName(playerState.trackName, 27)
  }, [playerState.trackName]);

  const {
    backgroundColorStyle,
    borderTopRightRadiusStyle,
    borderTopLeftRadiusStyle,
    opacityOpenedStyle,
    opacityRollupStyle
  } = usePlayerStyles(animatedPosition);

  const {
    togglePlaybackState,
    handleSheetChanges
  } = usePlayerActions({ sheetRef: sheetRef, playbackState: playbackState })


  // Render opened state
  const renderOpened = () => {
    const renderSlider = () => (
      <Slider
        tapToSeek={true}
        onTouchCancel={() => setModalUnlocked(true)}
        onTouchStart={() => setModalUnlocked(false)}
        onTouchEnd={() => setModalUnlocked(true)}
        style={{ width: Platform.OS === 'ios' ? SCREEN_WIDTH - 20 : SCREEN_WIDTH }}
        value={progress.position || 0}
        minimumValue={0}
        maximumValue={progress.duration || 0}
        thumbTintColor={BrandColors.PINK}
        minimumTrackTintColor={BrandColors.PINK}
        maximumTrackTintColor="rgba(238, 116, 116, 0.3)"
        onSlidingStart={() => setSeekState({ inProgress: true, position: progress.position })}
        onSlidingComplete={async (v) => {
          await TrackPlayer.seekTo(v)
          setSeekState({ inProgress: false, position: progress.position })
        }}
        onValueChange={(v) => setSeekState({ inProgress: true, position: v })}
      />
    )

    const renderControls = () => (
      <View style={styles.controlButtonsWrapper}>
        <Ripple
          rippleCentered={true}
          style={styles.controlButtonRipple}
          rippleContainerBorderRadius={24}
          onPressOut={() => TrackPlayer.seekTo((progress.position || 0) - 10)}
        >
          <LeftSeekIcon/>
        </Ripple>
        <Ripple
          rippleCentered={true}
          style={styles.controlButtonRipple}
          rippleContainerBorderRadius={24}
          onPress={togglePlaybackState}
        >
          {playbackState?.state === 'playing' ? (
            <PlayingStateOpenedIcon/>
          ) : (
            <PausedStateOpenedIcon/>
          )}
        </Ripple>
        <Ripple
          rippleCentered={true}
          style={styles.controlButtonRipple}
          rippleContainerBorderRadius={24}
          onPressOut={() => TrackPlayer.seekTo((progress.position || 0) + 10)}
        >
          <RightSeekIcon/>
        </Ripple>
      </View>
    )

    return(
      <Animated.View
        style={[
          opacityOpenedStyle,
          styles.internalWrapperOpened,
          { zIndex: playerState.playerSheetState === PlayerSheetState.OPENED ? 5 : 0, width: SCREEN_WIDTH }
        ]}
      >
        <View style={styles.handleIndicator}/>
        <Text style={styles.trackNameOpened}>
          {formattedOpenedTrackName}
        </Text>
        {renderSlider()}
        <View style={styles.trackTimeWrapper}>
          <Text style={styles.trackTime}>
            {formattedPositionTime}
          </Text>
          <Text style={styles.trackTime}>
            {formattedDurationTime}
          </Text>
        </View>
        {renderControls()}
      </Animated.View>
    )
  }


  // Render rolled up state
  const renderRolledUp = () => {
    const renderProgress = () => (
      <Progress.Bar
        progress={(progress.position || 0) / (progress.duration || 1)}
        width={SCREEN_WIDTH} height={5}
        color={'rgba(255, 255, 255, 0.3)'}
        borderWidth={0}
        style={{ position: 'absolute', top: 0 }}
      />
    )

    const renderPausePlayBtn = () => (
      <Ripple
        rippleCentered={true}
        style={styles.controlButtonRipple}
        rippleContainerBorderRadius={24}
        onPress={togglePlaybackState}
      >
        {playbackState?.state === 'playing'
          ? <PlayingStateRolledUpIcon/>
          : <PausedStateRolledUpIcon/>
        }
      </Ripple>
    )

    const renderCloseBtn = () => (
      <Ripple
        rippleCentered={true}
        style={styles.controlButtonRipple}
        rippleContainerBorderRadius={24}
        onPress={() => {
          TrackPlayer.pause()
          dispatch(setPlayerSheetState(PlayerSheetState.CLOSED))
        }}
      >
        <CloseIconRolledUp/>
      </Ripple>
    )

    return(
      <Animated.View
        style={[
          opacityRollupStyle,
          styles.internalWrapperRolledUp,
          {zIndex: playerState.playerSheetState === PlayerSheetState.ROLLED_UP ? 5 : 0, width: SCREEN_WIDTH }
        ]}
        onTouchEnd={(e) => {
          if (e.target === e.currentTarget) {
            dispatch(setPlayerSheetState(PlayerSheetState.OPENED))
          }
        }}
      >
        {renderProgress()}
        {renderPausePlayBtn()}
        <View onTouchStart={() => dispatch(setPlayerSheetState(PlayerSheetState.OPENED))}>
          <Text style={styles.trackNameRolledUp}>
            {formattedRolledUpTrackName}
          </Text>
        </View>
        {renderCloseBtn()}
      </Animated.View>
    )
  }


  // render all
  return (
    <BottomSheet
      ref={sheetRef}
      animatedPosition={animatedPosition}
      index={1}
      snapPoints={[ROLLED_UP_HEIGHT, OPENED_HEIGHT]}
      onChange={handleSheetChanges}
      style={[
        backgroundColorStyle,
        borderTopRightRadiusStyle,
        borderTopLeftRadiusStyle,
        { overflow: 'hidden', elevation: 20, shadowColor: MainColors.BLACK }
      ]}
      containerStyle={{ backgroundColor: 'transparent'}}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      handleIndicatorStyle={{ backgroundColor: 'transparent'}}
      handleStyle={{ height: 0, padding: 0 }}
      enableContentPanningGesture={isModalUnlocked}
      enablePanDownToClose={false}
      handleComponent={() => <PlayerHandleComponent/>}
    >
      <View style={styles.internalWrapper}>
        {renderOpened()}
        {renderRolledUp()}
      </View>
    </BottomSheet>
  );
}

export default React.memo(PlayerComponent)

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  internalWrapper: {
    flex: 1,
    position: 'relative',
  },
  internalWrapperOpened: {
    height: 220,
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32
  },
  handleIndicator: {
    borderRadius: 3,
    width: 60,
    height: 5,
    backgroundColor:
    BrandColors.AQUAMARINE,
    marginBottom: 10
  },
  trackNameRolledUp: {
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    color: MainColors.WHITE
  },
  trackNameOpened: {
    color: BrandColors.GRAY,
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    marginBottom: 28,
    marginTop: 4,
  },
  trackTimeWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  trackTime: {
    color: BrandColors.GRAY,
    fontFamily: FontStyles.PLAYER_TIME.fontFamily,
    fontSize: FontStyles.PLAYER_TIME.fontSize,
    lineHeight: FontStyles.PLAYER_TIME.lineHeight,
  },
  controlButtonsWrapper: {
    width: 208,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 16 : 32
  },
  controlButtonRipple: {
    width: 48,
    height: 48,
    padding: 8
  },
  internalWrapperRolledUp: {
    overflow: 'hidden',
    height: 64,
    position: 'absolute',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
