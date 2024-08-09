import Animated, { useAnimatedStyle, interpolate, interpolateColor } from 'react-native-reanimated';
import {BrandColors} from "../../../../constants/styles/Colors";

const useRouteCardAnimations = (progress: Animated.SharedValue<number>, isLocked: boolean) => {
  const nameColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [BrandColors.GRAY, isLocked ? BrandColors.GRAY : BrandColors.AQUAMARINE]
    );

    return { color };
  });

  const imgColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.07)']
    );

    return { backgroundColor };
  });

  const paddingLeftStyle = useAnimatedStyle(() => {
    const paddingLeft = interpolate(
      progress.value,
      [0, 1],
      [4, 0]
    );

    return { paddingLeft };
  });

  const paddingRightStyle = useAnimatedStyle(() => {
    const paddingRight = interpolate(
      progress.value,
      [0, 1],
      [4, 0]
    );

    return { paddingRight };
  });

  const paddingTopStyle = useAnimatedStyle(() => {
    const paddingTop = interpolate(
      progress.value,
      [0, 1],
      [2, 0]
    );

    return { paddingTop };
  });

  const paddingBottomStyle = useAnimatedStyle(() => {
    const paddingBottom = interpolate(
      progress.value,
      [0, 1],
      [2, 0]
    );

    return { paddingBottom };
  });

  return {
    nameColorStyle,
    imgColorStyle,
    paddingLeftStyle,
    paddingRightStyle,
    paddingTopStyle,
    paddingBottomStyle
  };
};

export default useRouteCardAnimations;
