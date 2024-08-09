import {ExtendedDistrictInfo} from "../../../constants/content_types/ContentTypes";
import {CardType} from "../CardType";

export interface DistrictCardProps {
  baseDistrictInfo: ExtendedDistrictInfo,
  cardType: CardType,
  districtPriceWithDiscount?: number,
  districtPriceCommon?: number,
  disableZoomOnPress?: boolean,
}
