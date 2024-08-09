import React, {useEffect} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {PlayerSheetState, setPlayerSheetState, setPlayerState} from "../../redux/reducers/player_reducer/PlayerReducer";
import TrackPlayer, {usePlaybackState} from "react-native-track-player";
import {MainColors} from "../../constants/styles/Colors";
import MapWithRoute from "../../components/map_with_route/MapWithRoute";
import ToolBar from "../../components/toolbar/ToolBar";
import DownloadingAudioHint from "./audio_loader/DownloadingAudioHint";
import {ActiveRouteScreenProps} from "./ActiveRouteScreenProps";
import i18n from "i18next";
import {I18nLang} from "../../i18n/config/I18nLang";
import {useAppDispatch, useAppSelector} from "../../redux/config/ReduxConfig";
import {ToolBarType} from "../../components/toolbar/ToolBarType";
import {ExtendedRouteInfo} from "../../constants/content_types/ContentTypes";

const ActiveRouteScreen: React.FC<ActiveRouteScreenProps> = ({ route}) => {
  const dispatch = useAppDispatch()
  const currLang = i18n?.language as I18nLang
  const {routeId, sights, engName, frenchName, rusName } = route.params
  const districts = useAppSelector(state => state.districts.districts)
  const playback = usePlaybackState()

  const resolveTrackName = () => {
    switch (currLang) {
      case I18nLang.FR:
        return frenchName
      case I18nLang.RU:
        return rusName ? rusName : engName
      default:
        return engName
    }
  }

  const resolveTrackUrl = (r: ExtendedRouteInfo | undefined) => {
    if (!r) {
      return ''
    }

    switch (currLang) {
      case I18nLang.FR:
        return r?.frenchAudioUrl
      case I18nLang.RU:
        return r?.rusAudioUrl ? r.rusAudioUrl : r?.engAudioUrl
      default:
        return r?.engAudioUrl
    }
  }

  useEffect(() => {
    TrackPlayer
      .getActiveTrack()
      .then(t => t?.url)
      .then(url => {
        const route = districts
          .flatMap(district => district.routes)
          .find(r => r.routeId === routeId)

        const newUrl = 'https:' + resolveTrackUrl(route)
        const shouldSeek = newUrl !== url
        if (newUrl !== url) {
          dispatch(setPlayerState({
            playerSheetState: PlayerSheetState.OPENED,
            trackUrl: newUrl,
            trackName: resolveTrackName() || '',
            trackAuthor: 'Audio Guide Paris',
          }))
        }

        return shouldSeek
      })
      .then((shouldSeek) => {
        setTimeout(() => {
          dispatch(setPlayerSheetState(PlayerSheetState.OPENED))
          TrackPlayer.play().then(() => {
            if (shouldSeek) {
              TrackPlayer.seekTo(0)
            }
          })
        }, 300)
      })
  }, [districts]);

  return(
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <ToolBar
        type={ToolBarType.BACK}
        text={resolveTrackName()}
      />
      <DownloadingAudioHint isShown={
        playback?.state !== 'playing' &&
        playback?.state !== 'paused'
      }/>
      <View style={{ flex: 1, backgroundColor: MainColors.WHITE}}>
        <MapWithRoute sights={sights} routeId={routeId} />
      </View>
    </View>
  )
}

export default React.memo(ActiveRouteScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainColors.WHITE,
    position: 'relative'
  }
})
