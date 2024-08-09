import TrackPlayer, {Capability, Event} from 'react-native-track-player';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer()
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
      Capability.JumpBackward,
      Capability.JumpForward
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
      Capability.JumpBackward,
      Capability.JumpForward
    ],
    notificationCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
      Capability.JumpBackward,
      Capability.JumpForward
    ],
  })
}

export const register = async () => {
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteJumpForward, async interval => {
    await TrackPlayer.seekTo(await getNewPosition(interval.interval, 'forward'));
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async interval => {
    await TrackPlayer.seekTo(await getNewPosition(interval.interval, 'backward'));
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, async seek => {
    await TrackPlayer.seekTo(seek.position);
  });
}

const getNewPosition = async (jumpInterval: number, jumpDirection: string)=> {
  const maxPosition = await TrackPlayer.getDuration();
  const currentPosition = await TrackPlayer.getPosition();

  let newPosition =
    jumpDirection === 'forward' ? currentPosition + jumpInterval : currentPosition - jumpInterval;
  if (newPosition > maxPosition) newPosition = maxPosition;
  if (newPosition < 0) newPosition = 0;
  return newPosition;
}
