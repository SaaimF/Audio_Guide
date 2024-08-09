import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {RouteProp} from "@react-navigation/native";

export interface RouteScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.ROUTE_SCREEN>;
  route: RouteProp<StackScreens, NavigationRoutes.ROUTE_SCREEN>;
}
