import VideoQualityLevels from "../constants/VideoQualityLevels";

export const adaptJitsiConfig = (roomId, parentNode, meetingSettings) => {
  const videoQuality = parseInt(meetingSettings.videoQuality, 10);

  const config = {
    roomName: `${roomId}-${window.location.hostname}`,
    width: "100%",
    height: "100%",
    parentNode,
    configOverwrite: {
      startWithAudioMuted: !meetingSettings.micEnabled,
      startWithVideoMuted: !meetingSettings.videoEnabled,
      resolution: videoQuality,
      constraints: {
        video: {
          aspectRatio: 16 / 9,
          height: {
            ideal: videoQuality,
            max: VideoQualityLevels.high,
            min: VideoQualityLevels.low
          }
        }
      },
      testing: {
        // Enables experimental simulcast support on Firefox.
        enableFirefoxSimulcast: meetingSettings.enableFirefoxSimulcast
      }
    },
    interfaceConfigOverwrite: {
      filmStripOnly: false
    }
  };
  console.log(meetingSettings, config);
  return config;
};
