import {ImageStyle} from "react-native";

export interface BaseImageProps {
  image: any,
  relativeWidth: number,
  relativeHeight: number,
  darkLayerOpacity: number,
  additionalStyle?: ImageStyle
  isLocal?: boolean,
}
