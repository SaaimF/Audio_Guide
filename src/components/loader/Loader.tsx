import React from "react";
import {View} from "react-native";
import {BrandColors, MainColors} from "../../constants/styles/Colors";
import * as Progress from 'react-native-progress';

const Loader: React.FC = () => {
  return(
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ scaleX: -1 }] }}
    >
      <View style={{ position: 'relative', height: 70 }}>
        <Progress.CircleSnail
          size={72}
          color={BrandColors.PINK_PRESSED}
          thickness={6}
          indeterminateAnimationDuration={0}
          duration={900}
          spinDuration={1800}
          style={{
            zIndex: 3
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            borderRadius: 30,
            backgroundColor: BrandColors.AQUAMARINE,
            width: 60,
            height: 60,
            zIndex: 1,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            borderRadius: 24,
            backgroundColor: MainColors.WHITE,
            width: 48,
            height: 48,
            zIndex: 2,
          }}
        />
      </View>
    </View>
  )
}

export default Loader
