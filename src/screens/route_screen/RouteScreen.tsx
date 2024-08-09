import {Platform, ScrollView, StyleSheet, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {useIsFocused} from "@react-navigation/native";
import ViewWithTopImage from "../../components/custom_views/view_with_top_image/ViewWithTopImage";
import PinkButton from "../../components/buttons/pink_button/PinkButton";
import {FontStyles} from "../../constants/styles/Fonts";
import {BrandColors} from "../../constants/styles/Colors";
import {PERMISSIONS, request} from "react-native-permissions";
import {ExtendedRouteInfo} from "../../constants/content_types/ContentTypes";
import Loader from "../../components/loader/Loader";
import {PlayerSheetState, setPlayerSheetState} from "../../redux/reducers/player_reducer/PlayerReducer";
import MapWithRoute from "../../components/map_with_route/MapWithRoute";
import ViewWithBottomPlayerMargin from "../../components/custom_views/view_with_player/ViewWithBottomPlayerMargin";
import LinearGradient from "react-native-linear-gradient";
import {useAppDispatch, useAppSelector} from "../../redux/config/ReduxConfig";
import {useTranslation} from "react-i18next";
import {I18nLang} from "../../i18n/config/I18nLang";
import GoIcon from "./assets/GoIcon";
import BackIcon from "./assets/BackIcon";
import {RouteScreenProps} from "./RouteScreenProps";
import styled from "styled-components/native";

const StyledVisualRouteInfoWrapper = styled.View`
  overflow: hidden;
  width: 100%; 
  aspect-ratio: 328 / 184;
  border-radius: 10px;
  margin-bottom: 16px;
`

const StyledTextRouteInfoWrapper = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
`

const RouteAllInfoWrapper = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
`

const RouteScreen: React.FC<RouteScreenProps> = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch()
  const playerSheetState = useAppSelector(state => state.player.playerSheetState)
  const districts = useAppSelector(state => state.districts.districts)

  const { t, i18n } = useTranslation()
  const currLang = i18n?.language as I18nLang

  const {
    routeId,
    image,
    frenchName,
    engName,
    rusName ,
  } = route.params

  const [extendedRouteInfo, setExtendedRouteInfo] = useState<ExtendedRouteInfo>()
  const validRoute = extendedRouteInfo && extendedRouteInfo?.sights?.length > 1 || false

  useEffect(() => {
    const r = districts
      .flatMap(district => district.routes)
      .find(r => r.routeId === routeId)

    setExtendedRouteInfo(r)
  }, [districts]);

  useEffect(() => {
    request(Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    )
  }, []);

  useEffect(() => {
    if (playerSheetState === PlayerSheetState.OPENED) {
      dispatch(setPlayerSheetState(PlayerSheetState.ROLLED_UP))
    }
  }, [isFocused]);

  const resolveRouteDescription = () => {
    if (!validRoute) {
      return t('ri_screen.not_ready_route')
    }

    switch (currLang) {
      case I18nLang.EN:
        return extendedRouteInfo?.engDescription
      case I18nLang.FR:
        return extendedRouteInfo?.frenchDescription
      case I18nLang.RU:
        return extendedRouteInfo?.rusDescription ? extendedRouteInfo.rusDescription : extendedRouteInfo?.engDescription
    }
  }

  const resolveRouteName = () => {
    if (!extendedRouteInfo) {
      return ''
    }

    switch (currLang) {
      case I18nLang.EN:
        return engName
      case I18nLang.FR:
        return frenchName
      case I18nLang.RU:
        return rusName ? rusName : engName
    }
  }

  const renderRouteTextInfo = () => {
    return(
      extendedRouteInfo && (
        <StyledTextRouteInfoWrapper>
          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
            style={styles.topGradientStyle}
          />
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Text style={styles.description}>
              {resolveRouteDescription()}
            </Text>
          </ScrollView>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            style={styles.bottomGradientStyle}
          />
        </StyledTextRouteInfoWrapper>
      )
    )
  }

  const renderRouteVisualInfo = () => {
    return(
      extendedRouteInfo && (
        <StyledVisualRouteInfoWrapper style={{ height: undefined }}>
          {/* {validRoute ? ( */}
            <MapWithRoute
              sights={extendedRouteInfo?.sights}
              routeId={routeId}
            />
          {/* // ) : (
          //   <BaseImageView
              // image={dummyMap}
          //     relativeWidth={328}
          //     relativeHeight={184}
          //     darkLayerOpacity={0}
          //     isLocal={true}
          //   />
          // )} */}
        </StyledVisualRouteInfoWrapper>
      )
    )
  }

  const renderButton = () => {
    return(
      extendedRouteInfo && (
        <PinkButton
          text={validRoute ? t('ri_screen.go_btn') : t('ri_screen.not_ready_btn')}
          action={() => {
            if (validRoute) {
              navigation.navigate(NavigationRoutes.ACTIVE_ROUTE_SCREEN, extendedRouteInfo)
            } else {
              navigation.goBack()
            }
          }}
          additionalStyle={{ flexDirection: validRoute ? 'row' : 'row-reverse', marginTop: 27 }}
          icon={validRoute ? <GoIcon/> : <BackIcon/>}
        />
      )
    )
  }

  return(
    <ViewWithTopImage
      image={image}
      name={resolveRouteName()}
    >
      <ViewWithBottomPlayerMargin>
        {extendedRouteInfo ? (
          <RouteAllInfoWrapper>
            {renderRouteVisualInfo()}
            {renderRouteTextInfo()}
            {renderButton()}
          </RouteAllInfoWrapper>
        ) : (
          <Loader/>
        )}
      </ViewWithBottomPlayerMargin>
    </ViewWithTopImage>
  )
}

export default React.memo(RouteScreen)

const styles = StyleSheet.create({
  description: {
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    color: BrandColors.GRAY,
    flexWrap: 'nowrap',
  },
  topGradientStyle: {
    height: 16,
    width: '100%',
    position: 'absolute',
    zIndex: 20
  },
  bottomGradientStyle: {
    height: 16,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 20
  },
  contentContainerStyle: {
    paddingTop: 13,
    paddingBottom: 13
  }
})
