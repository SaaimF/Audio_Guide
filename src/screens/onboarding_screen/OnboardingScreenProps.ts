import {StackNavigationProp} from "@react-navigation/stack";
import {StackScreens} from "../../navigation/StackScreens";
import {NavigationRoutes} from "../../navigation/NavigationRoutes";

export interface OnboardingScreenProps {
  navigation: StackNavigationProp<StackScreens, NavigationRoutes.ONBOARDING_SCREEN>;
}
