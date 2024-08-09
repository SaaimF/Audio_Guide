import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";

export interface MainScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.MAIN_SCREEN>;
}
