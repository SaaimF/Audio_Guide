import React from "react";
import {ViewStyle} from "react-native";

export interface DefaultAnimatedButtonProps extends React.PropsWithChildren {
  action: () => void;
  animationDuration?: number;
  normalColor: string;
  colorOnPress: string;
  style: ViewStyle;
}
