import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";
import {RouteProp} from "@react-navigation/native";

export interface DistrictScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.DISTRICT_SCREEN>;
  route: RouteProp<StackScreens, NavigationRoutes.DISTRICT_SCREEN>;
}
