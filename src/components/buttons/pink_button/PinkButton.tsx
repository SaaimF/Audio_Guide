import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {BrandColors, MainColors} from "../../../constants/styles/Colors";
import {FontStyles} from "../../../constants/styles/Fonts";
import DefaultAnimatedButton from "../default_animated_button/DefaultAnimatetButton";
import {FacadeButtonProps} from "../FacadeButtonProps";

const PinkButton: React.FC<FacadeButtonProps> = ({ icon, text, action, additionalStyle}) => {
  return (
    <DefaultAnimatedButton
      action={action}
      colorOnPress={BrandColors.PINK_PRESSED}
      normalColor={BrandColors.PINK}
      style={{...styles.container, ...additionalStyle}}
    >
      <Text style={styles.text}>
        {text}
      </Text>
      {icon}
    </DefaultAnimatedButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FontStyles.BUTTONS.fontFamily,
    fontSize: FontStyles.BUTTONS.fontSize,
    lineHeight: FontStyles.BUTTONS.lineHeight,
    color: MainColors.WHITE
  }
});

export default PinkButton
