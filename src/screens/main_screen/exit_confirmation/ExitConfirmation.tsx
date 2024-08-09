import React, {useEffect, useRef, useState} from "react";
import {Animated, BackHandler, StyleSheet, Text} from "react-native";
import {FontStyles} from "../../../constants/styles/Fonts";
import {MainColors} from "../../../constants/styles/Colors";
import {useNavigation, useNavigationState} from "@react-navigation/native";
import {NavigationProps} from "../../../navigation/AppNavigator";
import {Shadow} from "react-native-shadow-2";
import {useTranslation} from "react-i18next";

const ExitConfirmation: React.FC = () => {
  const screenIndex = useNavigationState(s => s.index);
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()

  const [exitApp, setExitApp] = useState(0);
  const containerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (exitApp === 1) {
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [exitApp]);

  const backAction = () => {
    if (screenIndex === 0) {
      setTimeout(() => {
        setExitApp(0);
      }, 2000);
      if (exitApp === 0) {
        setExitApp(exitApp + 1);

      } else if (exitApp === 1) {
        setExitApp(0);
        BackHandler.exitApp();
      }
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  return (
    <Animated.View style={[styles.wrapper, {opacity: containerOpacity}]} pointerEvents={'none'}>
      <Shadow offset={[1, 1]} distance={1}>
        <Text style={styles.text}>
          {t('home_screen.exit_confirmation')}
        </Text>
      </Shadow>
    </Animated.View>
  );
}

export default ExitConfirmation

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 99,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 32,
    alignItems: 'center',
  },
  text: {
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 32,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    textAlignVertical: 'center',
    fontFamily: FontStyles.SIDE_MENU_ITEMS.fontFamily,
    fontSize: FontStyles.SIDE_MENU_ITEMS.fontSize,
    lineHeight: FontStyles.SIDE_MENU_ITEMS.lineHeight,
    color: MainColors.WHITE,
  }
})
