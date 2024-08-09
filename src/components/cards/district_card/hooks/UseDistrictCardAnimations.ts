import { Animated } from 'react-native';
import {useRef} from "react";

const useDistrictCardAnimations = (disableZoomOnPress?: boolean) => {
  const cardPaddingHorizontalValue = useRef(new Animated.Value(disableZoomOnPress ? 0 : 4)).current;
  const cardPaddingVerticalValue = useRef(new Animated.Value(disableZoomOnPress ? 0 : 2)).current;

  const handleCardScaleIn = () => {
    if (!disableZoomOnPress) {
      Animated.timing(cardPaddingHorizontalValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start();
      Animated.timing(cardPaddingVerticalValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  };

  const handleCardScaleOut = () => {
    if (!disableZoomOnPress) {
      Animated.timing(cardPaddingHorizontalValue, {
        toValue: 4,
        duration: 150,
        useNativeDriver: false
      }).start();
      Animated.timing(cardPaddingVerticalValue, {
        toValue: 2,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  };

  return {
    cardPaddingHorizontalValue,
    cardPaddingVerticalValue,
    handleCardScaleIn,
    handleCardScaleOut
  };
};

export default useDistrictCardAnimations;
