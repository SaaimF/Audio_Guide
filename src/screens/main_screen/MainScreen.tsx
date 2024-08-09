import React from "react";
import {BackHandler, Platform, RefreshControl, View} from 'react-native';
import SideMenu from "../../components/side_menu/SideMenu";
import ToolBar from "../../components/toolbar/ToolBar";
import Loader from "../../components/loader/Loader";
import DistrictCard from "../../components/cards/district_card/DistrictCard";
import ViewWithBottomPlayerMargin from "../../components/custom_views/view_with_player/ViewWithBottomPlayerMargin";
import {CardType} from "../../components/cards/CardType";
import PinkButton from "../../components/buttons/pink_button/PinkButton";
import TransparentButton from "../../components/buttons/transparent_button/TransparentButton";
import {FontStyles} from "../../constants/styles/Fonts";
import {BrandColors} from "../../constants/styles/Colors";
import ExitConfirmation from "./exit_confirmation/ExitConfirmation";
import AppStateObserver from "../../app_state_observer/AppStateObserver";
import {MainScreenProps} from "./MainScreenProps";
import {useTranslation} from "react-i18next";
import styled from "styled-components/native";
import NetworkErrorIcon from "./assets/NetworkErrorIcon";
import TechWorksIcon from "./assets/TechWorksIcon";
import {fetchDistricts} from "../../redux/reducers/district_reducer/thunks/FetchDistrictsAsyncThunk";
import {useAppDispatch, useAppSelector} from "../../redux/config/ReduxConfig";
import {FetchErrorType} from "../../redux/reducers/district_reducer/thunks/FetchErrorType";
import {ToolBarType} from "../../components/toolbar/ToolBarType";

const StyledMainAppWrapper = styled.View`
  flex: 1;
  background-color: white;
`

const StyledLoaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const StyledDistrictsWrapper = styled.ScrollView`
  flex: 1;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: ${Platform.OS === 'ios' ? 16 : 0}px;
`

const StyledErrorText = styled.Text`
  font-family: ${FontStyles.MENU_ITEMS.fontFamily};
  font-size: ${FontStyles.MENU_ITEMS.fontSize}px;
  line-height: ${FontStyles.MENU_ITEMS.lineHeight}px;
  color: ${BrandColors.GRAY};
  text-align: center;
`

const StyledErrorWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
`

const StyledErrorInfoWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const MainScreen: React.FC<MainScreenProps> = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { districts, isLoading, error}
    = useAppSelector(state => state.districts);

  const renderError = () => (
    <StyledErrorWrapper>
      <StyledErrorInfoWrapper>
        {error === FetchErrorType.NETWORK_ERROR
          ? <NetworkErrorIcon/>
          : <TechWorksIcon/>
        }
        <StyledErrorText>
          {error === FetchErrorType.NETWORK_ERROR
            ? t('home_screen.error.network')
            : t('home_screen.error.tech_works')
          }
        </StyledErrorText>
      </StyledErrorInfoWrapper>
      <View>
        <TransparentButton
          text={t('home_screen.error.quit_button')}
          action={() => BackHandler.exitApp()}
        />
        <PinkButton
          text={t('home_screen.error.retry_btn')}
          additionalStyle={{ width: '100%', marginTop: 8 }}
          action={() => dispatch(fetchDistricts())}
        />
      </View>
    </StyledErrorWrapper>
  )

  const renderLoader = () => (
    <StyledLoaderWrapper>
      <Loader/>
    </StyledLoaderWrapper>
  )

  const renderDistricts = () => (
    <StyledDistrictsWrapper
      refreshControl={
        <RefreshControl
          refreshing={districts?.length > 0 && isLoading}
          onRefresh={() => dispatch(fetchDistricts())}
          colors={[BrandColors.AQUAMARINE]}
        />
      }
    >
      {districts.map(d => (
        <DistrictCard
          key={d?.districtId}
          cardType={CardType.COMMON}
          baseDistrictInfo={{...d}}
        />
      ))}
    </StyledDistrictsWrapper>
  )

  return(
    <ViewWithBottomPlayerMargin>
      <ExitConfirmation/>
      <AppStateObserver
        onActiveAction={() => dispatch(fetchDistricts())}
      />
      <StyledMainAppWrapper>
        <SideMenu>
          <ToolBar
            text={t('home_screen.header')}
            type={ToolBarType.BURGER}
          />
          {typeof error === 'number' ? (
            renderError()
          ) : (
            isLoading && districts?.length === 0 ? (
              renderLoader()
            ) : (
              renderDistricts()
            )
          )}
        </SideMenu>
      </StyledMainAppWrapper>
    </ViewWithBottomPlayerMargin>
  )
}

export default React.memo(MainScreen)
