import { useAnimatedStyle, interpolate, interpolateColor, SharedValue } from 'react-native-reanimated';
import {Dimensions, StatusBar} from 'react-native';
import {BrandColors, MainColors} from "../../../constants/styles/Colors";
import {UsePlayerStylesProps} from "./UsePlayerStylesProps";
const SCREEN_HEIGHT = Dimensions.get('window').height + (StatusBar.currentHeight || 0)

const usePlayerStyles = (animatedPosition: SharedValue<number>): UsePlayerStylesProps => {
  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedPosition.value,
      [SCREEN_HEIGHT - 110, SCREEN_HEIGHT - 200],
      [BrandColors.AQUAMARINE, MainColors.WHITE]
    );
    return { backgroundColor };
  });

  const borderTopRightRadiusStyle = useAnimatedStyle(() => {
    const borderTopRightRadius = interpolate(
      animatedPosition.value,
      [SCREEN_HEIGHT - 110, SCREEN_HEIGHT - 200],
      [14, 20]
    );
    return { borderTopRightRadius };
  });

  const borderTopLeftRadiusStyle = useAnimatedStyle(() => {
    const borderTopLeftRadius = interpolate(
      animatedPosition.value,
      [SCREEN_HEIGHT - 110, SCREEN_HEIGHT - 200],
      [14, 20]
    );
    return { borderTopLeftRadius };
  });

  const opacityOpenedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedPosition.value,
      [SCREEN_HEIGHT - 110, SCREEN_HEIGHT - 200],
      [0, 1]
    );
    return { opacity };
  });

  const opacityRollupStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedPosition.value,
      [SCREEN_HEIGHT - 110, SCREEN_HEIGHT - 200],
      [1, 0]
    );
    return { opacity };
  });

  return {
    backgroundColorStyle,
    borderTopRightRadiusStyle,
    borderTopLeftRadiusStyle,
    opacityOpenedStyle,
    opacityRollupStyle
  };
};

export default usePlayerStyles;
