import React, {useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BaseImageProps} from "./BaseImageViewProps";

const BaseImageView: React.FC<BaseImageProps> = (props) => {
  const {
    isLocal,
    image,
    additionalStyle,
    relativeHeight,
    relativeWidth,
    darkLayerOpacity
  } = props
  const [isLoaded, setLoaded] = useState(false)

  return(
    <View style={[
      styles.wrapper,
      additionalStyle,
      {aspectRatio: relativeWidth / relativeHeight}
    ]}>
      {!isLoaded &&
        <SkeletonPlaceholder>
          <View
            style={[
              styles.wrapper,
              additionalStyle,
              {aspectRatio: relativeWidth / relativeHeight}
            ]}
          />
        </SkeletonPlaceholder>
      }
      <View
        style={[
          styles.darkLayer,
          additionalStyle,
          {backgroundColor: `rgba(0, 0, 0, ${isLoaded ? darkLayerOpacity : 0.10})`},
          {aspectRatio: relativeWidth / relativeHeight}
        ]}
      />
      <Image
        onLoad={() => setLoaded(true)}
        source={!isLocal ? { uri: 'https:' + image } : image}
        style={[
          styles.wrapper,
          additionalStyle,
          {aspectRatio: relativeWidth / relativeHeight}
        ]}
      />
    </View>
  )
}

export default BaseImageView

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: undefined,
    overflow: "hidden"
  },
  darkLayer: {
    width: '100%',
    height: undefined,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2
  },
})
