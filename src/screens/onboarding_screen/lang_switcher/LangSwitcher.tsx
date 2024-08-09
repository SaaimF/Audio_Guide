import React from "react";
import Ripple from "react-native-material-ripple";
import {Image, StyleSheet} from "react-native";


import {PlayerButtonsColors} from "../../../constants/styles/Colors";
import {useTranslation} from "react-i18next";
import {I18nLang} from "../../../i18n/config/I18nLang";
import {setI18nLang} from "../../../i18n/config/i18n";
import {LangSwitcherProps} from "./LangSwitcherProps";
import styled from "styled-components/native";

const StyledRippleWrapper = styled(Ripple)<{
  $currLang: I18nLang,
  $assignedLang: I18nLang
}>`
  background-color: ${props => props?.$currLang === props?.$assignedLang 
          ? PlayerButtonsColors.LIGHT_AQUAMARINE 
          : 'transparent'
  };
  margin-left: 8px;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 4px;
`

const LangSwitcher: React.FC<LangSwitcherProps> = ({ assignedLang}) => {
  const { i18n } = useTranslation()
  const currLang = i18n?.language as I18nLang

  return(
    <StyledRippleWrapper
      $currLang={currLang}
      $assignedLang={assignedLang}
      rippleContainerBorderRadius={8}
      onPress={() => setI18nLang(assignedLang)}
      rippleCentered={true}
    >
      {/* <Image
        source={assignedLang === I18nLang.EN ? en : (assignedLang === I18nLang.FR ? fr : ru)}
        style={styles.imageStyle}
      /> */}
    </StyledRippleWrapper>
  )
}

export default LangSwitcher

const styles = StyleSheet.create({
  imageStyle: {
    width: 32,
    height: 32
  }
})
