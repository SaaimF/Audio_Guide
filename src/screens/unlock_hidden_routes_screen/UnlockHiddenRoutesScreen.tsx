import React, {useEffect, useState} from "react";
import {StatusBar, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ToolBar from "../../components/toolbar/ToolBar";
import RouteCard from "../../components/cards/route_card/RouteCard";
import ViewWithBottomPlayerMargin from "../../components/custom_views/view_with_player/ViewWithBottomPlayerMargin";
import {CardType} from "../../components/cards/CardType";
import DistrictCard from "../../components/cards/district_card/DistrictCard";
import {useDispatch} from "react-redux";
import {ExtendedDistrictInfo} from "../../constants/content_types/ContentTypes";
import {calcPrice} from "./PriceCalculator";
import {MainColors} from "../../constants/styles/Colors";
import Loader from "../../components/loader/Loader";
import {PlayerSheetState, setPlayerSheetState} from "../../redux/reducers/player_reducer/PlayerReducer";
import {UnlockHiddenRoutesScreenProps} from "./UnlockHiddenRoutesScreenProps";
import {useAppSelector} from "../../redux/config/ReduxConfig";
import {useTranslation} from "react-i18next";
import {ToolBarType} from "../../components/toolbar/ToolBarType";
import {DISTRICT_PRICE_WITH_DISCOUNT} from "@env";
import PurchaseResultModal from "../../components/modals/purchase_result_modal/PurchaseResultModal";

const UnlockHiddenRoutesScreen: React.FC<UnlockHiddenRoutesScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const districts = useAppSelector(state => state.districts.districts)
  const purchasedRoutes = useAppSelector(state => state.purchases.purchasedRoutes)
  const {districtId, currentRoute } = route.params

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [currDistrict, setCurrDistrict] = useState<ExtendedDistrictInfo | undefined>()
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrDistrict(districts.find(d => d.districtId === districtId))
  }, [districts, districtId])

  useEffect(() => {
    if (purchasedRoutes.includes(currentRoute.routeId) && navigation.canGoBack()) {
      navigation.goBack()
    }
  }, [purchasedRoutes]);

  useEffect(() => {
    dispatch(setPlayerSheetState(PlayerSheetState.CLOSED))
    const tId = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(tId)
  }, []);

  return(
    <View style={{ flex: 1,  backgroundColor: MainColors.WHITE }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
        animated={false}
      />
      <ToolBar
        type={ToolBarType.BACK}
        text={t('uhr_screen.header')}
      />
      <ViewWithBottomPlayerMargin>
        {isLoaded ? (
          <View style={{ flex: 1, padding: 16 }}>
            <RouteCard
              districtId={districtId}
              baseRouteInfo={currentRoute}
              cardType={CardType.BUY}
            />
            {currDistrict && (
              <DistrictCard
                baseDistrictInfo={currDistrict}
                cardType={CardType.BUY}
                districtPriceWithDiscount={DISTRICT_PRICE_WITH_DISCOUNT}
                districtPriceCommon={calcPrice(currDistrict.routes)}
                disableZoomOnPress={false}
              />
            )}
          </View>
        ) : (
          <Loader/>
        )}
      </ViewWithBottomPlayerMargin>
      <PurchaseResultModal />
    </View>
  )
}

export default React.memo(UnlockHiddenRoutesScreen)
