import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {FontStyles} from "../../../constants/styles/Fonts";
import {BrandColors, GrayColors, MainColors} from "../../../constants/styles/Colors";

import {useTranslation} from "react-i18next";
import {OnboardingCarouselProps} from "./OnboardingCarouselProps";
import {OnboardingCarouselItemProps} from "./OnboardingCarouselItemProps";
import styled from "styled-components/native";

const StyledCarouselItem = styled.View<{
  $shortDevice: boolean;
  $itemIdx: number
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: ${props => props?.$itemIdx === 0 
          ? props?.$shortDevice ? 55 : 65 
          : props?.$shortDevice ? 25 : 30
  }px;
`

const StyledImageWrapper = styled.View<{ $imageIdx: number }>`
  width: 100%;
  align-items: ${props => props?.$imageIdx === 0 ? 'center' : 'flex-end'};
`

const StyledImage = styled.Image<{
  $shortDevice: boolean;
  $itemIdx: number;
}>`
  aspect-ratio: 1;
  margin-bottom: ${props => props?.$itemIdx === 0
          ? props?.$shortDevice ? 15 : 30
          : props?.$shortDevice ? 15 : 35
  }px;
  width: ${props => Math.min(
    Dimensions.get('screen').width, 
    Dimensions.get('screen').height / (props?.$shortDevice ? 2.6 : 2.4)
  )}px;
`

const StyledTextWrapper = styled.View<{ $itemIdx: number }>`
  margin-left: 16px;
  margin-right: 16px;
  height: 120px;
  justify-content: flex-end;
  ${props => props?.$itemIdx === 0 && 'height: 90px'};
`

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ carouselRef, onSnapToItemAction }) => {
  const { t } = useTranslation()
  const shortDevice = Dimensions.get('window').height < 760

  const [currIdx, setCurrIdx] = useState(0)
  const elements: OnboardingCarouselItemProps[] = [
    {
      index: 0,
      text: t('onboarding.first.carousel_text'),
      picture: null
    },
    {
      index: 1,
      text: t('onboarding.second.carousel_text'),
      picture: null
    }
  ];

  const renderItem = ({ item }: { item: OnboardingCarouselItemProps }) => {
    return (
      <StyledCarouselItem
        $itemIdx={item.index}
        $shortDevice={shortDevice}
      >
        <StyledImageWrapper $imageIdx={item.index}>
          <StyledImage
            source={item.picture}
            $shortDevice={shortDevice}
            $itemIdx={item.index}
            style={{ height: undefined }}
          />
        </StyledImageWrapper>
        <StyledTextWrapper $itemIdx={item.index}>
          <Text style={styles.text}>
            {item.text}
          </Text>
        </StyledTextWrapper>
      </StyledCarouselItem>
    );
  };

  return (
    <View>
      <Carousel
        inactiveSlideShift={0}
        vertical={false}
        data={elements}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        ref={carouselRef}
        layout={'default'}
        onSnapToItem={index => {
          onSnapToItemAction(index)
          setCurrIdx(index)
        }}
      />
      <Pagination
        dotsLength={2}
        activeDotIndex={currIdx}
        dotContainerStyle={styles.dotContainerStyle}
        dotStyle={styles.dotStyle}
        dotColor={BrandColors.AQUAMARINE}
        inactiveDotScale={0.82}
        inactiveDotColor={GrayColors.MIDDLE}
      />
    </View>
  );
};

export default OnboardingCarousel;

const styles = StyleSheet.create({
  textWrapper: {
    marginLeft: 16,
    marginRight: 16,
    height: 120,
    justifyContent: 'flex-end',
  },
  text: {
    fontFamily: FontStyles.MAIN_TEXT.fontFamily,
    fontSize: FontStyles.MAIN_TEXT.fontSize,
    lineHeight: FontStyles.MAIN_TEXT.lineHeight,
    color: MainColors.BLACK,
    textAlign: 'center',
  },
  dotContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 4,
    padding: 0
  },
  dotStyle: {
    marginBottom: -5,
    marginTop: -5,
    width: 12,
    height: 12,
    borderRadius: 6
  }
})


