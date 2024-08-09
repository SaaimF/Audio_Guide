import { NavigationRoutes } from './NavigationRoutes'
import {BaseDistrictInfo, BaseRouteInfo, ExtendedRouteInfo} from "../constants/content_types/ContentTypes";

export type StackScreens = {
  [NavigationRoutes.MAIN_SCREEN]: { },
  [NavigationRoutes.ONBOARDING_SCREEN]: { },
  [NavigationRoutes.DISTRICT_SCREEN]: BaseDistrictInfo,
  [NavigationRoutes.ROUTE_SCREEN] : BaseRouteInfo,
  [NavigationRoutes.ACTIVE_ROUTE_SCREEN]: ExtendedRouteInfo,
  [NavigationRoutes.UNLOCK_HIDDEN_ROUTES_SCREEN] : {
    currentRoute: BaseRouteInfo
    districtId: number
  }
};
