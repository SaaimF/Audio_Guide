import React from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import Ripple from "react-native-material-ripple";
import {BrandColors, MainColors} from "../../constants/styles/Colors";
import Svg, {Path} from "react-native-svg";
import {FontStyles} from "../../constants/styles/Fonts";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../navigation/AppNavigator";
import {toggleSidebar} from "../../redux/reducers/sidebar_menu_reducer/SidebarMenuReducer";
import {ToolBarProps} from "./ToolBarProps";
import {ToolBarType} from "./ToolBarType";

const ToolBar: React.FC<ToolBarProps> = ({ type, text }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProps>();

  return(
    <View style={styles.wrapper}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
        animated={false}
      />
      <Ripple
        rippleCentered={true}
        rippleContainerBorderRadius={24}
        rippleColor={BrandColors.AQUAMARINE}
        rippleOpacity={0.4}
        style={styles.btn}
        onPress={() => {
          if (type === ToolBarType.BURGER) {
            dispatch(toggleSidebar())
          } else {
            navigation.goBack()
          }
        }}
      >
        {type === ToolBarType.BURGER ? (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12ZM3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17Z" fill="#3C3C3B"/>
          </Svg>
        ) : (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12.5 5L5.5 12M5.5 12L12 18.5M5.5 12H19.5" stroke="#3C3C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>

        )}
      </Ripple>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.txt]}>
          {text}
        </Text>
      </View>
    </View>
  )
}

export default ToolBar

const styles = StyleSheet.create({
  wrapper: {
    height: 64,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4,
    marginTop: 32,
    backgroundColor: MainColors.WHITE
  },
  btn: {
    width: 48,
    height: 48,
    padding: 12,
    marginRight: 12,
  },
  txt: {
    fontFamily: FontStyles.NAV_BAR.fontFamily,
    fontSize: FontStyles.NAV_BAR.fontSize,
    lineHeight: FontStyles.NAV_BAR.lineHeight,
    color: BrandColors.GRAY,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingTop: 10,
    marginRight: 64,
  }
})
