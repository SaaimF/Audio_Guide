import React from "react";
import Svg, {Circle, Path} from "react-native-svg";

const BigMarkerIcon: React.FC = () => {
  return(
    <Svg width="31" height="49" viewBox="0 0 31 49" fill="none">
      <Path d="M29.92 15.2845C29.92 17.2058 29.0403 20.1881 27.6188 23.6889C26.2129 27.1511 24.3297 30.998 22.4295 34.5969C20.5306 38.1933 18.6222 41.5281 17.1715 43.9624C16.4459 45.1799 15.8368 46.1688 15.4022 46.8504C15.4014 46.8515 15.4007 46.8527 15.4 46.8538C15.3993 46.8527 15.3986 46.8515 15.3978 46.8504C14.9632 46.1688 14.3541 45.1799 13.6285 43.9624C12.1778 41.5281 10.2694 38.1933 8.37051 34.5969C6.47032 30.998 4.58708 27.1511 3.18121 23.6889C1.75971 20.1881 0.88 17.2058 0.88 15.2845C0.88 7.33548 7.37455 0.880244 15.4 0.880244C23.4254 0.880244 29.92 7.33548 29.92 15.2845Z" fill="#FF4F51" stroke="#E44749" strokeWidth="1.76"/>
      <Circle cx="15.3999" cy="15.4004" r="7.48" fill="white"/>
    </Svg>
  )
}

export default BigMarkerIcon
