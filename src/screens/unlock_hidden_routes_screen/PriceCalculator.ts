import {BaseRouteInfo} from "../../constants/content_types/ContentTypes";

export const calcPrice = (routes: BaseRouteInfo[] | undefined): number => {
  return (routes || [])
    .filter(route => route.isLocked)
    .reduce((sum, route) => sum + (route.price || 0), 0);
}

