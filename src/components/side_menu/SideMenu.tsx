import * as React from 'react';
import {PropsWithChildren, useEffect, useState} from 'react';
import {Dimensions, Image, Linking, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {setIsSidebarShown} from "../../redux/reducers/sidebar_menu_reducer/SidebarMenuReducer";
import {FontStyles} from "../../constants/styles/Fonts";
import {BrandColors, GrayColors} from "../../constants/styles/Colors";
import SideMenuItem from "./side_menu_item/SideMenuItem";
import {useNavigation} from "@react-navigation/native";
import {setI18nLang} from "../../i18n/config/i18n";
import {I18nLang} from "../../i18n/config/I18nLang";
import {useTranslation} from "react-i18next";
import HomeIcon from "./assets/HomeIcon";
import SupportIcon from "./assets/SupportIcon";
import RestorePurchasesIcon from "./assets/RestorePurchasesIcon";
import {useAppDispatch, useAppSelector} from "../../redux/config/ReduxConfig";
import {SUPPORT_LINK, VERSION_NUMBER} from "@env";
import {restorePurchases} from "../../redux/reducers/purchases_reducer/thunks/RestorePurchasesAsyncThunk";

const SideMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProps>()

  const isOpened = useAppSelector(state => state.sidebar.isOpened)
  const { t, i18n } = useTranslation()
  const currLang = i18n?.language as I18nLang

  const [supportTransparent, setSupportTransparent] = useState(false)

  useEffect(() => {
    dispatch(setIsSidebarShown(false))
  }, [navigation]);

  useEffect(() => {
    const triggerSupport = async ()=> {
      if (supportTransparent) {
        await Linking.openURL(`mailto:${SUPPORT_LINK}`)
        navigation.navigate(NavigationRoutes.MAIN_SCREEN, {})
      }
    }

    let tId: NodeJS.Timeout | null = null
    triggerSupport().then(() => {
      tId = setTimeout(() => setSupportTransparent(false), 1000)
    })

    return () => {
      if (tId) {
        clearTimeout(tId)
      }
    }
  }, [supportTransparent]);

  const renderCommonButtons = () => (
    <>
      <SideMenuItem
        svg={<HomeIcon/>}
        closeMenuOnClick={true}
        text={t('side_menu.home')}
        onClick={() => navigation.navigate(NavigationRoutes.MAIN_SCREEN, {})}
      />
      <SideMenuItem
        rippleColor={supportTransparent ? 'transparent' : undefined}
        svg={<SupportIcon/>}
        closeMenuOnClick={false}
        text={t('side_menu.support')}
        onClick={() => setSupportTransparent(true)}
      />
      <SideMenuItem
        rippleColor={supportTransparent ? 'transparent' : undefined}
        svg={<RestorePurchasesIcon/>}
        closeMenuOnClick={false}
        text={t('side_menu.restore_purchases')}
        onClick={() => dispatch(restorePurchases())}
      />
    </>
  )

  const renderLangButtons = () => (
    <>
      {/* <SideMenuItem
        // svg={
          // <Image
          //   source={en}
          //   style={styles.itemImage}
          // />
        // }
        isChecked={currLang === I18nLang.EN}
        text={'English'}
        onClick={() => setI18nLang(I18nLang.EN)}
      />
      <SideMenuItem
        svg={
          <Image
            source={fr}
            style={styles.itemImage}
          />
        }
        isChecked={currLang === I18nLang.FR}
        text={'Français'}
        onClick={() => setI18nLang(I18nLang.FR)}
      />
      <SideMenuItem
        svg={
          <Image
            source={rus}
            style={styles.itemImage}
          />
        }
        isChecked={currLang === I18nLang.RU}
        text={'Русский'}
        onClick={() => setI18nLang(I18nLang.RU)}
      /> */}
    </>
  )

  return (
    <Drawer
      drawerStyle={styles.drawerStyle}
      open={isOpened}
      onOpen={() => dispatch(setIsSidebarShown(true))}
      onClose={() => dispatch(setIsSidebarShown(false))}
      swipeEdgeWidth={Dimensions.get('window').width}
      renderDrawerContent={() => {
        return (
          <View style={styles.drawerContentWrapperStyle}>
            <Text style={styles.versionTextStyle}>
              v. {VERSION_NUMBER}
            </Text>
            <Text style={styles.header}>
              Audio Guide Paris
            </Text>
            {renderCommonButtons()}
            {renderLangButtons()}
            {/* <Image
              source={louis}
              style={styles.louis}
            /> */}
          </View>
        )
      }}
    >
      {children}
    </Drawer>
  );
}

export default SideMenu

const styles = StyleSheet.create({
  drawerContentWrapperStyle: {
    flex: 1,
    position: 'relative'
  },
  drawerStyle: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: 264,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    marginTop: Dimensions.get('window').height * 0.175,
    fontFamily: FontStyles.NAV_BAR.fontFamily,
    fontSize: FontStyles.NAV_BAR.fontSize,
    lineHeight: FontStyles.NAV_BAR.lineHeight,
    color: BrandColors.PINK,
    marginBottom: 46,
    marginLeft: 16,
    height: 22,
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    display: 'flex',
    alignContent: 'flex-start',
    paddingTop: 5,
  },
  versionTextStyle: {
    fontFamily: FontStyles.VERSION_INFO.fontFamily,
    fontSize: FontStyles.VERSION_INFO.fontSize,
    lineHeight: FontStyles.VERSION_INFO.lineHeight,
    color: GrayColors.MIDDLE,
    marginTop: (StatusBar.currentHeight || 30) + 10,
    marginLeft: 16
  },
  louis: {
    width: 264,
    height: 138,
    position: 'absolute',
    bottom: 16
  },
  itemImage: {
    width: 24,
    height: 24
  }
})
