import React, {Suspense, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {FontStyles} from "../../constants/styles/Fonts";
import {BrandColors, MainColors} from "../../constants/styles/Colors";
import ViewWithTopImage from "../../components/custom_views/view_with_top_image/ViewWithTopImage";
import {BaseRouteInfo} from "../../constants/content_types/ContentTypes";
import Loader from "../../components/loader/Loader";
import RouteCard from "../../components/cards/route_card/RouteCard";
import ViewWithBottomPlayerMargin from "../../components/custom_views/view_with_player/ViewWithBottomPlayerMargin";
import {CardType} from "../../components/cards/CardType";
import BaseImageView from "../../components/custom_views/base_image_view/BaseImageView";
import PinkButton from "../../components/buttons/pink_button/PinkButton";
import {DistrictScreenProps} from "./DistrictScreenProps";
import {useTranslation} from "react-i18next";
import {I18nLang} from "../../i18n/config/I18nLang";
import i18n from "i18next";
import BackIcon from "./assets/BackIcon";
import styled from "styled-components/native";
import {useAppSelector} from "../../redux/config/ReduxConfig";

const StyledLoaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const StyledRouteWrapper = styled.View`
  position: relative;
  flex: 1;
`

const StyledNotReadyRouteWrapper = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`

const DistrictScreen: React.FC<DistrictScreenProps> = ({ navigation, route}) => {
  const { t } = useTranslation()
  const currLang = i18n?.language as I18nLang

  const districts = useAppSelector(state => state.districts.districts)
  const purchasedState = useAppSelector(state => state.purchases)

  const { districtId, engName, frenchName, rusName, image } = route.params
  const [routes, setRoutes] = useState<BaseRouteInfo[] | undefined>()

  useEffect(() => {
    const filteredRoutes = districts
      .find(d => d.districtId === districtId)?.routes || []
    const tId = setTimeout(() => setRoutes(filteredRoutes), filteredRoutes?.length > 0 ? 300 : 0)
    return () => {
      clearTimeout(tId)
    }
  }, []);

  const resolveDistrictHeader = () => {
    switch (currLang) {
      case I18nLang.RU:
        return rusName ? rusName : engName
      case I18nLang.FR:
        return frenchName
      default:
        return engName
    }
  }

  const renderLoader = () => {
    return(
      <StyledLoaderWrapper>
        <Loader/>
      </StyledLoaderWrapper>
    )
  }

  const renderNotReadyRoute = () => {
    return(
      <StyledNotReadyRouteWrapper>
        <View>
          {/* <BaseImageView
            image={require("./assets/dummy_district.png")}
            relativeWidth={328}
            relativeHeight={184}
            darkLayerOpacity={0}
            isLocal={true}
            additionalStyle={{ borderRadius: 10, marginBottom: 16 }}
          /> */}
          <Text style={styles.description}>
            {t('district_screen.not_ready_district_text')}
          </Text>
        </View>
        <PinkButton
          text={t('district_screen.back_button')}
          action={() => navigation.goBack()}
          additionalStyle={{ flexDirection: 'row-reverse' }}
          icon={<BackIcon/>}
        />
      </StyledNotReadyRouteWrapper>
    )
  }

  const renderReadyRoute = () => {
    return(
      <ScrollView style={styles.routesWrapper}>
        {routes?.map((r, index) => (
          <Suspense
            fallback={<Loader />}
            key={index}
          >
            <RouteCard
              districtId={districtId}
              baseRouteInfo={{
                ...r,
                isLocked: r.isLocked
                  && !purchasedState.purchasedRoutes.includes(r.routeId)
                  && !purchasedState.purchasedDistricts.includes(districtId)
              }}
              cardType={CardType.COMMON}
            />
          </Suspense>
        ))}
      </ScrollView>
    )
  }

  return(
    <ViewWithTopImage
      image={image}
      name={resolveDistrictHeader()}
    >
      <ViewWithBottomPlayerMargin>
        {routes ? (
          <StyledRouteWrapper>
            {routes.length > 0 ? (
              renderReadyRoute()
            ) : (
              renderNotReadyRoute()
            )}
          </StyledRouteWrapper>
        ) : (
          renderLoader()
        )}
      </ViewWithBottomPlayerMargin>
    </ViewWithTopImage>
  )
}

export default React.memo(DistrictScreen)

const styles = StyleSheet.create({
  districtName: {
    fontFamily: FontStyles.NAV_BAR.fontFamily,
    fontSize: FontStyles.NAV_BAR.fontSize,
    lineHeight: FontStyles.NAV_BAR.lineHeight,
    color: MainColors.WHITE,
    paddingTop: 9,
    margin: 12
  },
  routesWrapper: {
    padding: 16
  },
  description: {
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    color: BrandColors.GRAY,
    flexWrap: 'nowrap',
  }
})
