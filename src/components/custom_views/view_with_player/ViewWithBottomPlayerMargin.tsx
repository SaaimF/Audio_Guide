import React, {PropsWithChildren, useEffect, useRef} from "react";
import {Animated, Platform} from "react-native";
import {PlayerSheetState} from "../../../redux/reducers/player_reducer/PlayerReducer";
import {useAppSelector} from "../../../redux/config/ReduxConfig";

const IOS_MARGIN_BOTTOM = 84
const ANDROID_MARGIN_BOTTOM = 64

const ViewWithBottomPlayerMargin: React.FC<PropsWithChildren> = ({ children }) => {
  const playerSheetState = useAppSelector(state => state.player.playerSheetState)
  const animatedBottomMargin = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (playerSheetState === PlayerSheetState.OPENED || playerSheetState === PlayerSheetState.ROLLED_UP) {
      open()
    } else {
      close()
    }
  }, [playerSheetState]);

  const open = () => {
    Animated.timing(animatedBottomMargin, {
      toValue: Platform.OS === 'ios' ? IOS_MARGIN_BOTTOM : ANDROID_MARGIN_BOTTOM,
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  const close = () => {
    Animated.timing(animatedBottomMargin, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  return(
    <Animated.View
      style={{
        flex: 1,
        paddingBottom: animatedBottomMargin,
        backgroundColor: 'white'
      }}
    >
      {children}
    </Animated.View>
  )
}

export default ViewWithBottomPlayerMargin
