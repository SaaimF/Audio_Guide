import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, View} from "react-native";
import {FontStyles} from "../../../constants/styles/Fonts";
import Ripple from "react-native-material-ripple";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../../navigation/AppNavigator";
import {MainColors} from "../../../constants/styles/Colors";
import BaseImageView from "../../custom_views/base_image_view/BaseImageView";
import LockIcon from "../assets/LockIcon";
import {CardType} from "../CardType";
import LinearGradient from "react-native-linear-gradient";
import {NavigationRoutes} from "../../../navigation/NavigationRoutes";
import i18n from "i18next";
import {I18nLang} from "../../../i18n/config/I18nLang";
import {DistrictCardProps} from "./DistrictCardProps";
import {useAppDispatch} from "../../../redux/config/ReduxConfig";
import {makePurchase} from "../../../redux/reducers/purchases_reducer/thunks/MakePurchaseAsyncThunk";
import {PurchaseType} from "../../../redux/reducers/purchases_reducer/PurchaseType";
import {useTranslation} from "react-i18next";
import useDistrictCardAnimations from "./hooks/UseDistrictCardAnimations";

const DistrictCard: React.FC<DistrictCardProps> = (props) => {
  const navigation = useNavigation<NavigationProps>()
  const dispatch = useAppDispatch()

  const {
    baseDistrictInfo,
    cardType,
    districtPriceCommon,
    districtPriceWithDiscount,
    disableZoomOnPress
  } = props

  const {
    districtId,
    image,
    engName,
    frenchName,
    rusName,
    isLocked
  } = baseDistrictInfo

  const { t } = useTranslation()
  const currLang = i18n?.language as I18nLang

  const [isPressed, setPressed] = useState(disableZoomOnPress || false)
  const [canPress, setCanPress] = useState(true)

  const {
    cardPaddingHorizontalValue,
    cardPaddingVerticalValue,
    handleCardScaleIn,
    handleCardScaleOut
  } = useDistrictCardAnimations(disableZoomOnPress)

  useEffect(() => {
    let tId: NodeJS.Timeout | null = null;
    if (!canPress) {
      tId = setTimeout(() => setCanPress(true), 500)
    }

    return () => {
      if (tId) {
        clearTimeout(tId)
      }
    }
  }, [canPress]);

  const handlePressIn = () => {
    setCanPress(true)
    if (isLocked && cardType === CardType.COMMON) {
      setPressed(true)
    } else {
      handleCardScaleIn()
    }
  }

  const handlePressOut = async () => {
    if (isLocked && cardType === CardType.COMMON) {
      setPressed(false)
    } else {
      handleCardScaleOut()
    }

    if (!canPress) {
      return
    }

    if (cardType === CardType.COMMON) {
      if (!isLocked) {
        navigation.navigate(NavigationRoutes.DISTRICT_SCREEN, {
          districtId: districtId,
          image: image,
          frenchName: frenchName,
          engName: engName,
          rusName: rusName,
          isLocked: false
        })
      }
    } else {
      dispatch(makePurchase({ itemId: districtId, purchaseType: PurchaseType.DISTRICT }))
    }
  }

  const resolveDistrictName = () => {
    const prefix = cardType === CardType.BUY ? t('uhr_screen.all_routes_card_txt') : ''

    switch (currLang) {
      case I18nLang.FR:
        return prefix + frenchName
      case I18nLang.RU:
        return prefix + (rusName ? rusName : engName)
      default:
        return prefix + engName
    }
  }

  return(
    <Animated.View
      style={[styles.wrapper, {
        marginBottom: 12,
        position: 'relative',
        paddingTop: cardPaddingVerticalValue,
        paddingBottom: cardPaddingVerticalValue,
        paddingLeft: cardPaddingHorizontalValue,
        paddingRight: cardPaddingHorizontalValue
      }]}
    >
      <View style={styles.priceWrapper} pointerEvents={'none'}>
        {districtPriceWithDiscount &&
          <Text style={styles.districtPriceBuyWithDiscount}>
            {districtPriceWithDiscount}€
          </Text>
        }
        {districtPriceCommon && districtPriceWithDiscount && (districtPriceCommon > districtPriceWithDiscount) &&
          <Text style={styles.districtPriceBuyCommon}>
            {districtPriceCommon}€
          </Text>
        }
      </View>
      <Ripple
        delayPressIn={100}
        delayPressOut={200}
        rippleContainerBorderRadius={10}
        rippleDuration={500}
        rippleOpacity={0.1}
        rippleColor={isLocked ? MainColors.BLACK : MainColors.WHITE}
        onTouchCancel={() => setCanPress(false)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BaseImageView
          image={image}
          relativeWidth={328}
          relativeHeight={184}
          darkLayerOpacity={isLocked ? 0.7 : 0.4}
          additionalStyle={{ borderRadius: 10}}
        />
        {cardType === CardType.BUY && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255, 79, 81, 0.85)', 'rgba(108, 199, 224, 0.85)']}
            style={styles.grad}
          />
        )}
        {isLocked && cardType === CardType.COMMON && <LockIcon isPressed={isPressed} />}
      </Ripple>
      <View
        pointerEvents={'none'}
        style={[styles.nameTextWrapper]}
      >
        <Text style={styles.nameText}>
          {resolveDistrictName()}
        </Text>
      </View>
    </Animated.View>
  )
}

export default DistrictCard

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: undefined,
    aspectRatio: 328 / 184,
    borderRadius: 10,
    position: 'relative'
  },
  grad: {
    width: '100%',
    height: undefined,
    aspectRatio: 328 / 184,
    borderRadius: 10,
    position: 'absolute'
  },
  nameTextWrapper: {
    position: "absolute",
    bottom: 24,
    left: 24,
    marginRight: 24,
    zIndex: 3,
    width: 300,
  },
  nameText: {
    fontFamily: FontStyles.MENU_ITEMS.fontFamily,
    fontSize: FontStyles.MENU_ITEMS.fontSize,
    lineHeight: FontStyles.MENU_ITEMS.lineHeight,
    color: FontStyles.MENU_ITEMS.color,
    marginRight: 24,
    zIndex: 3,
  },
  priceWrapper: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  districtPriceBuyWithDiscount: {
    fontFamily: FontStyles.ROUTE_PRICE.fontFamily,
    fontSize: FontStyles.ROUTE_PRICE.fontSize,
    lineHeight: FontStyles.ROUTE_PRICE.lineHeight,
    color: MainColors.WHITE,
    zIndex: 10,
    paddingTop: 12,
    marginRight: 16,
  },
  districtPriceBuyCommon: {
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    color: MainColors.WHITE,
    textDecorationLine: 'line-through',
    zIndex: 10,
    marginBottom: 2
  },
});
