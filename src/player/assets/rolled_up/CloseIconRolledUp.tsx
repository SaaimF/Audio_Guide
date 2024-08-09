import Svg, {Path} from "react-native-svg";
import React from "react";

const CloseIconRolledUp: React.FC = () => {
  return(
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path d="M8 24L24 8M8 8L24 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default CloseIconRolledUp
