/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
import TrackPlayer from 'react-native-track-player';
import {register} from "./src/player/PlayerConfig";

// AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => register)

