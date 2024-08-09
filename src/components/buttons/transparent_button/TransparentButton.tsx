import React from "react";
import {FacadeButtonProps} from "../FacadeButtonProps";
import {BrandColors, GrayColors} from "../../../constants/styles/Colors";
import {StyleSheet, Text} from "react-native";
import {FontStyles} from "../../../constants/styles/Fonts";
import Ripple from "react-native-material-ripple";

const TransparentButton: React.FC<FacadeButtonProps> = ({ text, action, additionalStyle}) => {
  return (
    <Ripple
      onPress={action}
      style={[
        styles.container,
        additionalStyle
      ]}
      rippleContainerBorderRadius={25}
      rippleOpacity={0.4}
      rippleColor={GrayColors.MIDDLE}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 25,
    paddingTop: 13
  },
  text: {
    fontFamily: FontStyles.BUTTONS.fontFamily,
    fontSize: FontStyles.BUTTONS.fontSize,
    lineHeight: FontStyles.BUTTONS.lineHeight,
    color: BrandColors.GRAY,
    textAlign: 'center'
  }
});

export default TransparentButton
