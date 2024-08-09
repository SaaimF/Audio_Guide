import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {RouteProp} from "@react-navigation/native";

export interface UnlockHiddenRoutesScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.UNLOCK_HIDDEN_ROUTES_SCREEN>;
  route: RouteProp<StackScreens, NavigationRoutes.UNLOCK_HIDDEN_ROUTES_SCREEN>;
}
