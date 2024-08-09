import {Animated, BackHandler, Dimensions, StyleSheet, View} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {BrandColors, MainColors} from "../../../constants/styles/Colors";
import {Shadow} from "react-native-shadow-2";
import React, {useEffect} from "react";
import {BaseModalProps} from "./BaseModalProps";
import styled from "styled-components/native";

const StyledModalBackdrop = styled(Animated.View)`
  position: absolute; 
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height}px; 
  z-index: 0;
  pointer-events: none;
`

const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    isOpened,
    onClose,
    children,
    canClose,
    height
  } = props

  const handleModalClose = () => {
    if (canClose) {
      onClose()
    }

    return isOpened
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleModalClose);
    return () => backHandler.remove();
  });

  return(
    isOpened ? (
      <>
        <StyledModalBackdrop
          onTouchStart={e => {
            if (canClose && e.target === e.currentTarget) {
              onClose()
            }
          }}
        />
        <BottomSheet
          index={0}
          snapPoints={[height]}
          style={{ elevation: 20, shadowColor: MainColors.BLACK, zIndex: 9999999 }}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          backgroundStyle={{ backgroundColor: 'white', borderRadius: 20 }}
          handleIndicatorStyle={{ backgroundColor: 'white'}}
          enablePanDownToClose={canClose}
          onClose={onClose}
          handleComponent={() =>
            <Shadow
              sides={{ top: true, bottom: false, start: false, end: false}}
              distance={20}
            >
              <View style={styles.handleIndicatorWrapper}>
                <View style={styles.handleIndicator}/>
              </View>
            </Shadow>
          }
        >
          <View style={[styles.containerWrapper, { height: height }]}>
            {children}
          </View>
        </BottomSheet>
      </>
    ) : null
  )
}

export default BaseModal

const styles = StyleSheet.create({
  handleIndicatorWrapper: {
    width: Dimensions.get('screen').width,
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  handleIndicator: {
    borderRadius: 3,
    width: 60,
    height: 5,
    backgroundColor:
    BrandColors.AQUAMARINE,
    marginBottom: 10,
    marginTop: 10
  },
  containerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
  },
})

