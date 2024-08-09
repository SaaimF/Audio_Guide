import {Dimensions, StyleSheet, View} from "react-native";
import {Shadow} from "react-native-shadow-2";
import React from "react";

const PlayerHandleComponent: React.FC = () => {
  return(
    <Shadow
      sides={{
        top: true,
        bottom: false,
        start: false,
        end: false
      }}
    >
      <View style={styles.handleStyle}/>
    </Shadow>
  )
}

export default PlayerHandleComponent

const styles = StyleSheet.create({
  handleStyle: {
    width: Dimensions.get('screen').width,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute'
  }
})
