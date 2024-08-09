import React from "react";
import {Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import Ripple from "react-native-material-ripple";
import {MainColors} from "../../../constants/styles/Colors";
import BaseImageView from "../base_image_view/BaseImageView";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../../navigation/AppNavigator";
import {FontStyles} from "../../../constants/styles/Fonts";
import {Shadow} from "react-native-shadow-2";
import {ViewWithTopImageProps} from "./ViewWithTopImageProps";
import BackButtonIcon from "./assets/BackButtonIcon";

const ViewWithTopImage: React.FC<ViewWithTopImageProps> = ({ children, name, image }) => {
  const navigation = useNavigation<NavigationProps>()

  return(
    <View style={styles.mainWrapper}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <View style={{ aspectRatio: 360 / 202, zIndex: 10 }}>
        <View style={styles.rippleWrapper}>
          <Ripple
            rippleCentered={true}
            style={styles.rippleStyle}
            rippleContainerBorderRadius={24}
            onPress={() => navigation.goBack()}
            rippleColor={MainColors.WHITE}
            rippleOpacity={0.2}
          >
            <BackButtonIcon/>
          </Ripple>
          <View style={{flex: 1, height: 72, justifyContent: 'center' }}>
            <Text style={Platform.OS === 'ios' ? styles.districtNameIos : styles.districtName}>
              {name}
            </Text>
          </View>
        </View>
        <Shadow
          style={{ borderRadius: 10 }}
          containerStyle={styles.imageContainer}
          distance={4}
          startColor={'rgba(0, 0, 0, 0.08)'}
        >
          <BaseImageView
            darkLayerOpacity={0.4}
            image={image}
            relativeHeight={202}
            relativeWidth={360}
            additionalStyle={styles.imageStyle}
          />
        </Shadow>
      </View>
      {children}
    </View>
  )
}

export default ViewWithTopImage

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: MainColors.WHITE,
  },
  rippleWrapper: {
    zIndex: 5,
    top: StatusBar.currentHeight || 35,
    position: 'relative',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  rippleStyle: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  imageContainer: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    aspectRatio: 360 / 202,
    width: '100%',
    height: undefined,
  },
  imageStyle: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
  },
  districtName: {
    fontFamily: FontStyles.NAV_BAR.fontFamily,
    fontSize: FontStyles.NAV_BAR.fontSize,
    lineHeight: FontStyles.NAV_BAR.lineHeight,
    color: MainColors.WHITE,
    paddingTop: 9,
    margin: 12,
    height: 48,
    textAlignVertical: 'center',
    flexWrap: 'wrap',
  },
  districtNameIos: {
    fontFamily: FontStyles.NAV_BAR.fontFamily,
    fontSize: FontStyles.NAV_BAR.fontSize,
    lineHeight: FontStyles.NAV_BAR.lineHeight,
    color: MainColors.WHITE,
    paddingTop: 12,
    flexWrap: 'wrap',
  }
})
