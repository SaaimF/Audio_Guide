import React, {useEffect, useRef} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {FontStyles} from "../../../constants/styles/Fonts";
import {MainColors} from "../../../constants/styles/Colors";
import {Shadow} from "react-native-shadow-2";
import * as Progress from 'react-native-progress';
import {useTranslation} from "react-i18next";
import {DownloadingAudioHintProps} from "./DownloadingAudioHintProps";

const DownloadingAudioHint: React.FC<DownloadingAudioHintProps> = ({isShown}) => {
  const { t } = useTranslation()
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isShown) {
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
  }, [isShown]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: containerOpacity }
      ]}
      pointerEvents={'none'}
    >
      <Shadow offset={[1, 1]} distance={1}>
        <View style={styles.container}>
          <Progress.CircleSnail
            size={19}
            color={MainColors.WHITE}
            thickness={1.5}
            indeterminateAnimationDuration={0}
            duration={900}
            spinDuration={1800}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              {t('ar_screen.audion_loader_text')}
            </Text>
          </View>
        </View>
      </Shadow>
    </Animated.View>
  );
}

export default DownloadingAudioHint

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 99,
    position: 'absolute',
    top: 136,
    width: '100%',
    height: 32,
    alignItems: 'center',
  },
  container: {
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    height: 32,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWrapper: {
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  text: {
    fontFamily: FontStyles.SIDE_MENU_ITEMS.fontFamily,
    fontSize: FontStyles.SIDE_MENU_ITEMS.fontSize,
    lineHeight: FontStyles.SIDE_MENU_ITEMS.lineHeight,
    color: MainColors.WHITE,
  }
})
