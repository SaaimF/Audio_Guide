import React from "react";
import Carousel from "react-native-snap-carousel";
import {OnboardingCarouselItemProps} from "./OnboardingCarouselItemProps";

export interface OnboardingCarouselProps {
  carouselRef: React.MutableRefObject<Carousel<OnboardingCarouselItemProps> | null>
  onSnapToItemAction: (index: number) => void
}
