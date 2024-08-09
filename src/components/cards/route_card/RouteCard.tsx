import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import BaseImageView from "../../custom_views/base_image_view/BaseImageView";
import LockIcon from "../assets/LockIcon";
import {FontStyles} from "../../../constants/styles/Fonts";
import {GrayColors, MainColors} from "../../../constants/styles/Colors";
import Svg, {Path} from "react-native-svg";
import Animated, {useDerivedValue, withTiming} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../../navigation/AppNavigator";
import {NavigationRoutes} from "../../../navigation/NavigationRoutes";
import {CardType} from "../CardType";
import Ripple from "react-native-material-ripple";
import {I18nLang} from "../../../i18n/config/I18nLang";
import i18n from "i18next";
import {useAppDispatch} from "../../../redux/config/ReduxConfig";
import {BaseRouteInfoProps} from "./RouteCardProps";
import {makePurchase} from "../../../redux/reducers/purchases_reducer/thunks/MakePurchaseAsyncThunk";
import {PurchaseType} from "../../../redux/reducers/purchases_reducer/PurchaseType";
import useRouteCardAnimations from "./hooks/UseRouteCardAnimations";


const RouteCard: React.FC<BaseRouteInfoProps> = (props) => {
  const {
    cardType,
    baseRouteInfo,
    districtId
  } = props

  const {
    routeId,
    image,
    length,
    frenchName,
    price,
    engName,
    rusName,
    isLocked
  } = baseRouteInfo

  const [isPressed, setPressed] = useState(false);
  const currLang = i18n?.language as I18nLang

  const navigation = useNavigation<NavigationProps>()
  const dispatch = useAppDispatch()

  const progress = useDerivedValue(() => {
    return withTiming(isPressed ? 1 : 0, {duration: 100});
  }, [isPressed]);

  const {
    paddingLeftStyle,
    paddingRightStyle,
    paddingTopStyle,
    paddingBottomStyle,
    imgColorStyle,
    nameColorStyle
  } = useRouteCardAnimations(progress, isLocked)

  useEffect(() => {
    if (cardType === CardType.BUY) {
      setPressed(true)
      setTimeout(() => setPressed(false), 100)
    }
  }, []);

  const resolveRouteName = () => {
    switch (currLang) {
      case I18nLang.RU:
        return rusName ? rusName : engName
      case I18nLang.FR:
        return frenchName
      default:
        return engName
    }
  }

  const handlePress = async () => {
    if (cardType === CardType.COMMON) {
      if (!isLocked) {
        navigation.navigate(NavigationRoutes.ROUTE_SCREEN, {
          frenchName: frenchName,
          engName: engName,
          rusName: rusName,
          image: image,
          isLocked: false,
          routeId: routeId,
          length: length,
          price: price,
        })
      } else {
        navigation.navigate(NavigationRoutes.UNLOCK_HIDDEN_ROUTES_SCREEN, {
          currentRoute: {
            frenchName: frenchName,
            engName: engName,
            rusName: rusName,
            routeId: routeId,
            price: price,
            length: length,
            image: image,
            isLocked: true
          },
          districtId: districtId
        })
      }
    } else {
      dispatch(makePurchase({ itemId: districtId, purchaseType: PurchaseType.ROUTE }))
    }
  }

  return(
    <Animated.View
      style={
        cardType === CardType.BUY
          ? [{ position: 'relative'}, paddingLeftStyle, paddingRightStyle, paddingTopStyle, paddingBottomStyle]
          : []
      }
    >
      {cardType === CardType.BUY && (
        <>
          <View
            pointerEvents={'none'}
            style={{ width: 200, height: 100, position: 'absolute', zIndex: 99 }}
          >
            <Text style={styles.routePriceBuy}>
              {price}€
            </Text>
          </View>
          <View
            pointerEvents={'none'}
            style={{ position: 'absolute', left: 0, bottom: 12, zIndex: 99 }}
          >
            <Text style={styles.routeNameBuy}>
              {resolveRouteName()}
            </Text>
          </View>
        </>
      )}
      <Ripple
        rippleOpacity={0}
        delayPressIn={100}
        delayPressOut={200}
        style={{marginBottom: cardType === CardType.BUY ? 12 : 16 }}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={handlePress}
      >
        <>
          <View
            style={{
              position: 'relative', aspectRatio: 328 / 184, alignItems: 'center', justifyContent: 'center'
            }}
          >
            <BaseImageView
              image={image}
              relativeWidth={328}
              relativeHeight={184}
              darkLayerOpacity={cardType === CardType.COMMON ? isLocked ? 0.7 : 0.0 : 0.4}
              additionalStyle={{ borderRadius: 10}}
            />
            <Animated.View
              style={[{
                position: 'absolute',
                width: '100%',
                height: undefined,
                aspectRatio: 328 / 184,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 5,
                borderRadius: 10,
              }, imgColorStyle]}
            >
            </Animated.View>
            {isLocked && cardType === CardType.COMMON &&
              <LockIcon
                isPressed={isPressed}
                additionalStyle={{
                  zIndex: 7,
                  position: 'absolute',
                  top: ((Dimensions.get('window').width - 32) * (184 / 328)) / 2 - 30
                }}
              />
            }
          </View>
          {cardType === CardType.COMMON && (
            <View style={{ marginTop: 10, marginBottom: 12}}>
              <Animated.Text style={[styles.routeName, nameColorStyle]}>
                {resolveRouteName()}
              </Animated.Text>
              <View style={{ flexDirection: 'row'}}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path d="M18.3996 3.57249C18.6504 2.67673 18.7758 2.22885 18.6594 1.92151C18.558 1.65355 18.3464 1.44199 18.0784 1.34051C17.7711 1.22411 17.3232 1.34952 16.4275 1.60033L5.48117 4.66529C4.06634 5.06144 3.35892 5.25952 3.15393 5.59585C2.97664 5.88673 2.95963 6.24786 3.10878 6.55413C3.28124 6.90824 3.96689 7.17195 5.33821 7.69938L9.70286 9.37809C9.94727 9.4721 10.0695 9.5191 10.1723 9.5922C10.2634 9.65698 10.343 9.73658 10.4078 9.82768C10.4809 9.93048 10.5279 10.0527 10.6219 10.2971L12.3005 14.6617C12.8279 16.033 13.0916 16.7187 13.4457 16.8911C13.752 17.0403 14.1131 17.0233 14.404 16.846C14.7403 16.641 14.9384 15.9336 15.3346 14.5187L18.3996 3.57249Z" stroke="#6CC7E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
                <Text style={styles.routeLen}>
                  {length} km
                </Text>
              </View>
            </View>
          )}
        </>
      </Ripple>
    </Animated.View>
  )
}

export default RouteCard

const styles = StyleSheet.create({
  routeName: {
    fontFamily: FontStyles.MENU_ITEMS.fontFamily,
    fontSize: FontStyles.MENU_ITEMS.fontSize,
    lineHeight: FontStyles.MENU_ITEMS.lineHeight,
    marginBottom: 8,
  },
  routeLen: {
    fontFamily: FontStyles.SUBTEXTS.fontFamily,
    fontSize: FontStyles.SUBTEXTS.fontSize,
    lineHeight: FontStyles.SUBTEXTS.lineHeight,
    color: GrayColors.SUBTEXT,
    marginLeft: 8
  },
  routeNameBuy: {
    fontFamily: FontStyles.MENU_ITEMS.fontFamily,
    fontSize: FontStyles.MENU_ITEMS.fontSize,
    lineHeight: FontStyles.MENU_ITEMS.lineHeight,
    color: MainColors.WHITE,
    zIndex: 10,
    paddingTop: 10,
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
  },
  routePriceBuy: {
    fontFamily: FontStyles.ROUTE_PRICE.fontFamily,
    fontSize: FontStyles.ROUTE_PRICE.fontSize,
    lineHeight: FontStyles.ROUTE_PRICE.lineHeight,
    color: MainColors.WHITE,
    paddingTop: 10,
    marginTop: 24,
    marginLeft: 24,
  }
})
