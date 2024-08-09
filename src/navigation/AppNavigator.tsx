import React from "react";
import {StackScreens} from "./StackScreens";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {NavigationRoutes} from "./NavigationRoutes";
import OnboardingScreen from "../screens/onboarding_screen/OnboardingScreen";
import MainScreen from "../screens/main_screen/MainScreen";
import DistrictScreen from "../screens/district_screen/DistrictScreen";
import RouteScreen from "../screens/route_screen/RouteScreen";
import ActiveRouteScreen from "../screens/active_route_screen/ActiveRouteScreen";
import PlayerComponent from "../player/PlayerComponent";
import {PlayerSheetState} from "../redux/reducers/player_reducer/PlayerReducer";
import UnlockHiddenRoutesScreen from "../screens/unlock_hidden_routes_screen/UnlockHiddenRoutesScreen";
import {useAppSelector} from "../redux/config/ReduxConfig";
import {appNavigatorOptions} from "./AppNavigatorOptions";

const Stack = createStackNavigator<StackScreens>();
export type NavigationProps = StackNavigationProp<StackScreens>

const AppNavigator: React.FC = () => {
  const isPlayerClosed = useAppSelector(state => state.player.playerSheetState === PlayerSheetState.CLOSED)
  const skipOnboarding = useAppSelector(state => state.onboarding.completed)

  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={skipOnboarding
          ? NavigationRoutes.MAIN_SCREEN
          : NavigationRoutes.ONBOARDING_SCREEN}
      >
        <Stack.Screen
          name={NavigationRoutes.ONBOARDING_SCREEN}
          component={OnboardingScreen}
          options={appNavigatorOptions}
        />
        <Stack.Screen
          name={NavigationRoutes.MAIN_SCREEN}
          component={MainScreen}
          options={appNavigatorOptions}
        />
        <Stack.Screen
          name={NavigationRoutes.DISTRICT_SCREEN}
          component={DistrictScreen}
          options={appNavigatorOptions}
        />
        <Stack.Screen
          name={NavigationRoutes.ROUTE_SCREEN}
          component={RouteScreen}
          options={appNavigatorOptions}
        />
        <Stack.Screen
          name={NavigationRoutes.ACTIVE_ROUTE_SCREEN}
          component={ActiveRouteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationRoutes.UNLOCK_HIDDEN_ROUTES_SCREEN}
          component={UnlockHiddenRoutesScreen}
          options={appNavigatorOptions}
        />
      </Stack.Navigator>
      {!isPlayerClosed && <PlayerComponent/>}
    </NavigationContainer>
  )
}

export default AppNavigator
