import Svg, {Path} from "react-native-svg";
import * as React from "react";

const SupportIcon: React.FC = () => {
  return(
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M10 10.5V10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10V10.1213C14 10.6839 13.7765 11.2235 13.3787 11.6213L12 13M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16M12.5 16C12.5 15.7239 12.2761 15.5 12 15.5C11.7239 15.5 11.5 15.7239 11.5 16M12.5 16H11.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#3C3C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default SupportIcon
