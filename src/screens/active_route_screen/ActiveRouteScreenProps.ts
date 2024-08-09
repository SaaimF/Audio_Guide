import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {RouteProp} from "@react-navigation/native";

export interface ActiveRouteScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.ACTIVE_ROUTE_SCREEN>;
  route: RouteProp<StackScreens, NavigationRoutes.ACTIVE_ROUTE_SCREEN>;
}
