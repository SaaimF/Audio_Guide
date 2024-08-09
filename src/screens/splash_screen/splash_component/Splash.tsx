import React, {useEffect, useRef, useState} from "react";
import {SplashProps} from "./SplashProps";
import {Animated, StyleSheet} from "react-native";
import {SplashState} from "../SplashState";
import SplashScreenSvg from "../assets/SplashScreenSvg";
import {MainColors} from "../../../constants/styles/Colors";

const Splash: React.FC<SplashProps> = ({ isAppReady }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<SplashState>(SplashState.FADE_IN_IMAGE);

  useEffect(() => {
    if (state === SplashState.FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === SplashState.WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(SplashState.FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === SplashState.FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 300,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  return (
    state === SplashState.HIDDEN ? null : (
      <Animated.View
        collapsable={false}
        style={[style.container, { opacity: containerOpacity }]}
      >
        <SplashScreenSvg/>
      </Animated.View>
    )
  );
};

export default Splash

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: MainColors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
});
