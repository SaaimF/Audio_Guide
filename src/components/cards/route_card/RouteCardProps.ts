import {BaseRouteInfo} from "../../../constants/content_types/ContentTypes";
import {CardType} from "../CardType";

export interface BaseRouteInfoProps {
  baseRouteInfo: BaseRouteInfo,
  districtId: number,
  cardType: CardType,
}
