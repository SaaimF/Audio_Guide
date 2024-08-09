import {Marker} from "react-native-maps";
import {I18nLang} from "../../../i18n/config/I18nLang";
import BigMarkerIcon from "./assets/BigMarkerIcon";
import NormalMarkerIcon from "./assets/NormalMarkerIcon";
import {MapMarkerProps} from "./MapMarkerProps";
import React from "react";
import i18n from "i18next";

const MapMarker: React.FC<MapMarkerProps> = ({ sightInfo, idx, markersCount}) => {
  const currLang = i18n?.language as I18nLang

  const resolveName = () => {
    switch (currLang) {
      case I18nLang.FR:
        return sightInfo.engName
      case I18nLang.RU:
        return sightInfo.rusName ? sightInfo.rusName : sightInfo.engName
      default:
        return sightInfo.engName
    }
  }

  const resolveDescription = () => {
    switch (currLang) {
      case I18nLang.FR:
        return sightInfo.frenchDescription
      case I18nLang.RU:
        return sightInfo?.rusDescription ? sightInfo.rusDescription : sightInfo.engDescription
      default:
        return sightInfo.engDescription
    }
  }

  return(
    <Marker
      title={resolveName()}
      description={resolveDescription()}
      coordinate={{
        latitude: sightInfo.latitude,
        longitude: sightInfo.longitude
      }}
    >
      {idx === markersCount - 1 || idx === 0
        ? <BigMarkerIcon/>
        : <NormalMarkerIcon/>
      }
    </Marker>
  )
}

export default MapMarker
