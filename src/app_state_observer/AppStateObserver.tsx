import React, {useEffect, useState} from "react";
import {AppState} from "react-native";
import {AppStateObserverProps} from "./AppStateObserverProps";

const AppStateObserver: React.FC<AppStateObserverProps> = ({ onActiveAction }) => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState)
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      onActiveAction()
    }
  }, [appState]);

  return null;
}

export default AppStateObserver
