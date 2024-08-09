import {ExtendedDistrictInfo} from "../../../constants/content_types/ContentTypes";
import {FetchErrorType} from "./thunks/FetchErrorType";

export interface DistrictState {
  districts: ExtendedDistrictInfo[];
  isLoading: boolean;
  error?: FetchErrorType;
}
