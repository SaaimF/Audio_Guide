import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming,} from 'react-native-reanimated';
import {DefaultAnimatedButtonProps} from "./DefaultAnimatetButtonProps";

const DefaultAnimatedButton: React.FC<DefaultAnimatedButtonProps> = ({ children, action, animationDuration, normalColor, colorOnPress, style}) => {
  const [isPressed, setPressed] = useState(false);

  const progress = useDerivedValue(() => {
    return withTiming(isPressed ? 1 : 0, {duration: animationDuration || 100});
  }, [isPressed]);

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [normalColor, colorOnPress]
    );

    return { backgroundColor };
  });

  return (
    <Pressable
      onPress={action}
      style={{ width: '100%'}}
    >
      <Animated.View
        style={[style, backgroundColorStyle, styles.btnStyle]}
        onTouchStart={() => setPressed(true)}
        onTouchEndCapture={() => setPressed(false)}
        onTouchCancel={() => setPressed(false)}
        onMagicTap={() => setPressed(false)}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default DefaultAnimatedButton

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
