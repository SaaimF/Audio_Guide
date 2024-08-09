import Svg, {Path} from "react-native-svg";
import React from "react";

const BackIcon: React.FC = () => {
  return(
    <Svg style={{ marginRight: 8 }} width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path d="M13 5L6 12M6 12L12.5 18.5M6 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default BackIcon
