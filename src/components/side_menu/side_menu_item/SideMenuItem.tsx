import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Ripple from "react-native-material-ripple";
import {FontStyles} from "../../../constants/styles/Fonts";
import {BrandColors} from "../../../constants/styles/Colors";
import {setIsSidebarShown} from "../../../redux/reducers/sidebar_menu_reducer/SidebarMenuReducer";
import CheckedItemIcon from "../assets/CheckedItemIcon";
import {SideMenuItemProps} from "./SideMenuItemProps";
import {useAppDispatch} from "../../../redux/config/ReduxConfig";

const SideMenuItem: React.FC<SideMenuItemProps> = (props) => {
  const {
    rippleColor,
    closeMenuOnClick,
    onClick, isChecked,
    svg,
    text
  } = props
  const dispatch = useAppDispatch();

  return(
    <Ripple
      rippleContainerBorderRadius={24}
      rippleColor={rippleColor || BrandColors.AQUAMARINE}
      rippleOpacity={0.4}
      style={[styles.commonItem]}
      onPress={() => {
        if (closeMenuOnClick) {
          dispatch(setIsSidebarShown(false))
        }
        onClick()
      }}
    >
      {svg}
      <Text style={styles.itemText}>
        {text}
      </Text>
      {isChecked && (
        <View style={styles.checked}>
          <CheckedItemIcon/>
        </View>
      )}
    </Ripple>
  )
}

export default SideMenuItem

const styles = StyleSheet.create({
  commonItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 48,
    paddingVertical: 12,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 24,
    alignItems: 'flex-start',
    position: 'relative',
  },
  itemText: {
    fontFamily: FontStyles.SIDE_MENU_ITEMS.fontFamily,
    fontSize: FontStyles.SIDE_MENU_ITEMS.fontSize,
    lineHeight: FontStyles.SIDE_MENU_ITEMS.lineHeight,
    marginLeft: 8,
    color: BrandColors.GRAY
  },
  checked: {
    position: 'absolute',
    top: 12,
    right: 12
  }
})
