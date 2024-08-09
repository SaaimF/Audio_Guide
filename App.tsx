import {GestureHandlerRootView} from "react-native-gesture-handler";
import {enableScreens} from "react-native-screens";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/config/StoreConfig";
import React, {useEffect, useState} from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import WithSplashScreen from "./src/screens/splash_screen/SplashScreen";
import {StatusBar} from "react-native";
import {setupPlayer} from "./src/player/PlayerConfig";
import {initI18n} from "./src/i18n/config/i18n";
import RestorePurchasesModal from "./src/components/modals/restore_purchases_modal/RestorePurchasesModal";

const App: React.FC = () => {
  enableScreens(true);
  const [isAppReady, setAppReady] = useState(false)

  useEffect(() => {
    Promise.all([
      setupPlayer()
        .then(() => console.log('player initialized'))
        .catch((e) => console.error((e as Error).message)),

      initI18n()
        .then(() => console.log('lang initialized'))
        .catch(e => console.error((e as Error).message))
    ]).finally(() => setAppReady(true))
  }, []);

  return(
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
        animated={false}
      />
      <WithSplashScreen isAppReady={isAppReady}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GestureHandlerRootView style={{flex: 1}}>
              <AppNavigator/>
              <RestorePurchasesModal />
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      </WithSplashScreen>
    </>
  )
}

export default App;
