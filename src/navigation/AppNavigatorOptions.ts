import {StackNavigationOptions, TransitionPresets} from "@react-navigation/stack";

export const appNavigatorOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300
      }
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300
      }
    }
  }
}
