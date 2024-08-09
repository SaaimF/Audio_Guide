import {createAsyncThunk} from "@reduxjs/toolkit";
import {ExtendedDistrictInfo, ExtendedRouteInfo, SightInfo} from "../../../../constants/content_types/ContentTypes";
import axios from "axios/index";
import {API_KEY_CONTENTFUL, API_URL_GET_DISTRICTS} from "@env";
import {I18nLang} from "../../../../i18n/config/I18nLang";

const getContentfulEntries = async (): Promise<any> => {
  const url = API_URL_GET_DISTRICTS;
  const params = {
    access_token: API_KEY_CONTENTFUL,
    limit: 1000,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

const resolveAudio = (jsonData: any, rawRouteInfo: any, lang: I18nLang) => {
  switch (lang) {
    case I18nLang.EN:
      return jsonData.includes.Asset.find((a: any) => a.sys.id === rawRouteInfo.fields.engAudio.sys.id).fields.file.url
    case I18nLang.FR:
      return jsonData.includes.Asset.find((a: any) => a.sys.id === rawRouteInfo.fields.frenchAudio.sys.id).fields.file.url
    case I18nLang.RU:
      try {
        return jsonData.includes.Asset.find((a: any) => a.sys.id === rawRouteInfo.fields.rusAudio.sys.id).fields.file.url
      } catch (err) {
        return jsonData.includes.Asset.find((a: any) => a.sys.id === rawRouteInfo.fields.engAudio.sys.id).fields.file.url
      }
  }
}

const convertContentfulSchemaToAppSchema = (jsonData: any): ExtendedDistrictInfo[] => {
  return jsonData.items
    .filter((item: any) => item.sys.contentType.sys.id === 'district')
    .map((rawDistrictInfo: any) => {
      let routes: ExtendedRouteInfo[] = []

      if (rawDistrictInfo.fields.routes) {
        routes = rawDistrictInfo.fields.routes.map((r: any) => {
          const rawRouteInfo = jsonData.items.find((r1: any) => r1.sys.id === r.sys.id)

          let sights: SightInfo[] = []

          if (rawRouteInfo.fields.sights) {
            try {
              sights = rawRouteInfo.fields.sights.map((s: any) => {
                const rawSightInfo = jsonData.items.find((s1: any) => s1.sys.id === s.sys.id)

                const sight: SightInfo = {
                  engName: rawSightInfo.fields.engName,
                  frenchName: rawSightInfo.fields.frenchName,
                  rusName: rawSightInfo.fields.rusName,
                  rusDescription: rawSightInfo.fields.rusDescription,
                  engDescription: rawSightInfo.fields.engDescription,
                  frenchDescription: rawSightInfo.fields.frenchDescription,
                  latitude: rawSightInfo.fields.location.lat,
                  longitude: rawSightInfo.fields.location.lon,
                }

                return sight
              })
            } catch (e) {
              sights = []
            }
          }

          try {
            const route: ExtendedRouteInfo = {
              routeId: rawRouteInfo.fields.id,
              isLocked: rawRouteInfo.fields.isLocked,
              length: rawRouteInfo.fields.length,
              price: rawRouteInfo.fields.price,
              image: jsonData.includes.Asset.find((a: any) => a.sys.id === rawRouteInfo.fields.image.sys.id).fields.file.url,
              engName: rawRouteInfo.fields.engName,
              frenchName: rawRouteInfo.fields.frenchName,
              rusName: rawRouteInfo.fields.rusName,
              engDescription: rawRouteInfo.fields.engDescription,
              rusDescription: rawRouteInfo.fields.rusDescription,
              frenchDescription: rawRouteInfo.fields.frenchDescription,
              engAudioUrl: resolveAudio(jsonData, rawRouteInfo, I18nLang.EN),
              frenchAudioUrl: resolveAudio(jsonData, rawRouteInfo, I18nLang.FR),
              rusAudioUrl: resolveAudio(jsonData, rawRouteInfo, I18nLang.RU),
              sights: sights
            }

            return route
          } catch (e) {
            return undefined
          }
        })
      }

      const district: ExtendedDistrictInfo = {
        districtId: rawDistrictInfo.fields.id,
        image: jsonData.includes.Asset.find((a: any) => a.sys.id === rawDistrictInfo.fields.image.sys.id).fields.file.url,
        engName: rawDistrictInfo.fields.engName,
        frenchName: rawDistrictInfo.fields.frenchName,
        rusName: rawDistrictInfo.fields.rusName,
        isLocked: rawDistrictInfo.fields.isLocked,
        routes: routes
      }

      return district
    })
}

export const fetchDistricts = createAsyncThunk<ExtendedDistrictInfo[]>(
  'districts/fetchDistricts',
  async () => await getContentfulEntries()
    .then(rawData => convertContentfulSchemaToAppSchema(rawData))
    .then(convertedData => convertedData.sort(
      (d1, d2) => d2.routes.length - d1.routes.length))
);
