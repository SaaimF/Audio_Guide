import React from "react";
import Splash from "./splash_component/Splash";
import {WithSplashScreenProps} from "./SplashScreenProps";

const WithSplashScreen: React.FC<WithSplashScreenProps> = ({children, isAppReady}) => {
  return (
    <>
      {isAppReady && children}
      <Splash isAppReady={isAppReady} />
    </>
  );
}

export default WithSplashScreen
