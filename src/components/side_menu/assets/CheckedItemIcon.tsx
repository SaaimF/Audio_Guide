import * as React from "react";
import Svg, {Path} from "react-native-svg";

const CheckedItemIcon: React.FC = () => {
  return(
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M6 12.5L9.34783 16L17 8" stroke="#6CC7E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default CheckedItemIcon
