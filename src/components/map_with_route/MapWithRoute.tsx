import React, {useEffect, useRef, useState} from "react";
import MapView from "react-native-maps";
import {StyleSheet, View} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import {BrandColors} from "../../constants/styles/Colors";
import Loader from "../loader/Loader";
import LocationButton from "./location_button/LocationButton";
import Geolocation from '@react-native-community/geolocation';
import {API_KEY_GOOGLE_MAPS} from "@env";
import MapMarker from "./marker/MapMarker";
import {MapWithRouteProps} from "./MapWithRouteProps";

const MapWithRoute: React.FC<MapWithRouteProps> = ({ sights}) => {
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const mapRef = useRef<MapView | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, []);

  const onLocationButtonPress = () => {
    Geolocation.getCurrentPosition(position => mapRef?.current?.animateToRegion(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }, 600
    ), error => console.log('failed to load location:' + error))
  }

  return(
    <View style={styles.container}>
      {
        sights.length > 1 && isLoaded ? (
          <>
            <LocationButton
              layoutProps={styles.locationButtonLayout}
              action={onLocationButtonPress}
            />
            <MapView
              ref={mapRef}
              showsUserLocation={true}
              showsMyLocationButton={false}
              initialRegion={{
                latitude: sights[0].latitude,
                longitude: sights[0].longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              style={StyleSheet.absoluteFillObject}
            >
              {sights.map((s, i) => (
                <MapMarker
                  sightInfo={s}
                  idx={i}
                  markersCount={sights?.length}
                  key={i}
                />
              ))}
              <MapViewDirections
                mode='WALKING'
                origin={{
                  latitude: sights[0].latitude,
                  longitude: sights[0].longitude,
                }}
                destination={{
                  latitude: sights.slice(-1)[0].latitude,
                  longitude: sights.slice(-1)[0].longitude,
                }}
                waypoints={sights.flatMap(s => {
                  return {
                    latitude: s.latitude,
                    longitude: s.longitude
                  }
                })}
                apikey={API_KEY_GOOGLE_MAPS}
                strokeWidth={2}
                strokeColor={BrandColors.PINK}
              />
            </MapView>
          </>
        ) : (
          <Loader/>
        )
      }
    </View>
  )
}

export default React.memo(MapWithRoute)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  locationButtonLayout: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999
  }
})
