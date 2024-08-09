import React, {useEffect} from "react";
import {Animated, Dimensions, StyleSheet, ViewStyle} from "react-native";
import LockIconSvg from "./LockIconSvg";

interface LockIconProps {
  isPressed: boolean,
  additionalStyle?: ViewStyle;
}
const LockIcon: React.FC<LockIconProps> = ({  isPressed, additionalStyle}) => {
  const lockScaleValue = new Animated.Value(isPressed ? 1 : 1.2)

  useEffect(() => {
    if (isPressed) {
      handleLockScaleIn()
    } else {
      handleLockScaleOut()
    }
  }, [isPressed]);

  const handleLockScaleIn = () => {
    Animated.timing(lockScaleValue, {
      toValue: 1.2,
      duration: 100,
      useNativeDriver: true
    }).start()
  }

  const handleLockScaleOut = () => {
    Animated.timing(lockScaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start()
  }

  return(
    <Animated.View
      style={[
        styles.lockStyle,
        { transform:[{scale: lockScaleValue}] },
        additionalStyle
      ]}
    >
      <LockIconSvg/>
    </Animated.View>
  )
}

export default LockIcon

const styles = StyleSheet.create({
  lockStyle: {
    position: 'absolute',
    width: Dimensions.get('screen').width - 32,
    zIndex: 4,
    top: 24,
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
