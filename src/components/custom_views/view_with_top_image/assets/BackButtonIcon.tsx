import Svg, {Path} from "react-native-svg";
import React from "react";

const BackButtonIcon: React.FC = () => {
  return(
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <Path d="M24.5 17L17.5 24M17.5 24L24 30.5M17.5 24H31.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default BackButtonIcon
