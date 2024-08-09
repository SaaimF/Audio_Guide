import {ViewStyle} from "react-native";

export interface FacadeButtonProps {
  text: string;
  action: () => void;
  additionalStyle?: ViewStyle;
  icon? : any;
}
