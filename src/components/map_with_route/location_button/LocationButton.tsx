import React from "react";
import {Platform, StyleSheet} from "react-native";
import Ripple from "react-native-material-ripple";
import {GrayColors, MainColors} from "../../../constants/styles/Colors";
import {Shadow} from "react-native-shadow-2";
import RNLocationEnabler from 'react-native-instantpay-location-enabler';
import {LocationButtonProps} from "./LocationButtonProps";
import LocationButtonIcon from "./assets/LocationButtonIcon";

const LocationButton: React.FC<LocationButtonProps> = ({ layoutProps, action}) => {
  const handlePress = () => {
    if (Platform.OS === 'android') {
      RNLocationEnabler
        ?.checkLocation({askDailogPermission: true})
        ?.then(() => action())
    } else {
      action()
    }
  }

  return(
    <Shadow
      distance={10}
      startColor={'rgba(0, 0, 0, 0.08)'}
      containerStyle={layoutProps}
    >
      <Ripple
        onPress={handlePress}
        rippleOpacity={0.4}
        rippleColor={GrayColors.MIDDLE}
        style={styles.btnStyle}
      >
        <LocationButtonIcon/>
      </Ripple>
    </Shadow>
  )
}

export default LocationButton

const styles = StyleSheet.create({
  btnStyle: {
    width: 38,
    height: 38,
    borderRadius: 8,
    padding: 7,
    backgroundColor: MainColors.WHITE
  }
})
