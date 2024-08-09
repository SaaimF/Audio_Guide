export const formatTime = (timeInSeconds: number): string => {
  if (!timeInSeconds) {
    timeInSeconds = 0
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatTrackName = (trackName: string, maxLen: number): string => {
  let formattedTrackName = trackName.slice(0, Math.min(trackName.length, maxLen))

  if (formattedTrackName !== trackName) {
    formattedTrackName += '...'
  }

  return formattedTrackName
}
