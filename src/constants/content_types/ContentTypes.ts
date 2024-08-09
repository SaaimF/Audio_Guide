export interface SightInfo {
  engName: string;
  engDescription: string;
  rusName: string;
  frenchName: string;
  frenchDescription: string;
  rusDescription: string;
  latitude: number,
  longitude: number,
}

export interface BaseRouteInfo {
  routeId: number;
  price: number;
  engName: string;
  frenchName: string;
  rusName: string;
  image: any,
  length: number,
  isLocked: boolean;
}

export interface ExtendedRouteInfo extends BaseRouteInfo {
  engDescription: string;
  frenchDescription: string;
  rusDescription: string;
  engAudioUrl: string;
  frenchAudioUrl: string;
  rusAudioUrl: string;
  sights: SightInfo[];
}

export interface BaseDistrictInfo {
  districtId: number;
  image: any;
  engName: string;
  frenchName: string;
  rusName: string;
  isLocked: boolean;
}

export interface ExtendedDistrictInfo extends BaseDistrictInfo {
  routes: ExtendedRouteInfo[]
}
