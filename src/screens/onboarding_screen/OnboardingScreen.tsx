import React, {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, Platform, StyleSheet, Text, View} from "react-native";
import {BrandColors, GrayColors, MainColors} from "../../constants/styles/Colors";
import PinkButton from "../../components/buttons/pink_button/PinkButton";
import OnboardingCarousel from "./onboarding_carousel/OnboardingCarousel";
import Carousel from "react-native-snap-carousel";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {useDispatch} from "react-redux";
import Ripple from "react-native-material-ripple";
import {FontStyles} from "../../constants/styles/Fonts";
import LangSwitcher from "./lang_switcher/LangSwitcher";
import {setOnboardingCompleted} from "../../redux/reducers/onboarding_reducer/OnboardingReducer";
import {I18nLang} from "../../i18n/config/I18nLang";
import {useTranslation} from "react-i18next";
import {OnboardingCarouselItemProps} from "./onboarding_carousel/OnboardingCarouselItemProps";
import {OnboardingScreenProps} from "./OnboardingScreenProps";

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [currStep, setCurrStep] = useState(1)
  const carouselRef = useRef<Carousel<OnboardingCarouselItemProps> | null>(null)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (currStep === 1) {
      carouselRef?.current?.snapToItem(0)
    } else if (currStep === 2) {
      carouselRef?.current?.snapToItem(1)
    }
  }, [currStep]);

  const handleHide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start()
  }

  const handleDisplay = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (currStep === 1) {
      handleDisplay()
    } else {
      handleHide()
    }
  }, [currStep]);

  return(
    <View style={[styles.onboardingScreenContainer]}>
      <View style={styles.onboardingScreenInternalContainer}>
        <LangSwitcher assignedLang={I18nLang.FR}/>
        <LangSwitcher assignedLang={I18nLang.EN}/>
        <LangSwitcher assignedLang={I18nLang.RU}/>
      </View>
      <OnboardingCarousel
        carouselRef={carouselRef}
        onSnapToItemAction={index => setCurrStep(index + 1)}
      />
      <View style={styles.btnContainer}>
        <Animated.View style={{ opacity: opacity }}>
          <Ripple
            onPress={() => {
              if (currStep === 1) {
                dispatch(setOnboardingCompleted())
                navigation.reset({
                  index: 0,
                  routes: [{name: NavigationRoutes.MAIN_SCREEN, params: {}}],
                });
              }
            }}
            style={styles.skipButtonStyle}
            rippleContainerBorderRadius={25}
            rippleOpacity={0.2}
            rippleColor={GrayColors.MIDDLE}
          >
            <Text style={styles.skipButtonTextStyle}>
              {t('onboarding.first.top_button')}
            </Text>
          </Ripple>
        </Animated.View>

        <PinkButton
          action={() => {
            if (currStep === 1) {
              setCurrStep(2)
            }
            if (currStep === 2) {
              dispatch(setOnboardingCompleted())
              navigation.reset({
                index: 0,
                routes: [{name: NavigationRoutes.MAIN_SCREEN, params: {}}],
              });
            }
          }}
          text={currStep === 1
            ? t('onboarding.first.bottom_button')
            : t('onboarding.second.button')
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  onboardingScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: MainColors.WHITE,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 52,
    position: 'relative'
  },
  onboardingScreenInternalContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 58,
    width: Dimensions.get('window').width,
    zIndex: 5
  },
  btnContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: MainColors.WHITE,
  },
  skipButtonStyle: {
    marginBottom: 10,
    height: 50,
    borderRadius: 25,
    paddingTop: 13
  },
  skipButtonTextStyle: {
    fontFamily: FontStyles.BUTTONS.fontFamily,
    fontSize: FontStyles.BUTTONS.fontSize,
    lineHeight: FontStyles.BUTTONS.lineHeight,
    color: BrandColors.GRAY,
    textAlign: 'center'
  }
});

export default React.memo(OnboardingScreen)
