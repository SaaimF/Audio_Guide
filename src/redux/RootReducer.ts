import {combineReducers} from "redux";
import onboardingReducer from "./reducers/onboarding_reducer/OnboardingReducer";
import sidebarMenuReducer from "./reducers/sidebar_menu_reducer/SidebarMenuReducer";
import districtReducer from "./reducers/district_reducer/DistrictReducer";
import purchasesReducer from "./reducers/purchases_reducer/PurchasesReducer";
import {store} from "./config/StoreConfig";
import playerReducer from "./reducers/player_reducer/PlayerReducer";

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  sidebar: sidebarMenuReducer,
  districts: districtReducer,
  player: playerReducer,
  purchases: purchasesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
