import { getVideoHeight } from "../constants/ResolutionLevels";

export const adaptJitsiConfig = (roomId, parentNode, meetingSettings) => {
  const resolution = parseInt(meetingSettings.resolution, 10);

  const config = {
    roomName: `${roomId}-${window.location.hostname}`,
    width: "100%",
    height: "100%",
    parentNode,
    configOverwrite: {
      startWithAudioMuted: !meetingSettings.micEnabled,
      startWithVideoMuted: !meetingSettings.videoEnabled,
      resolution,
      constraints: {
        video: {
          aspectRatio: 16 / 9,
          height: getVideoHeight(resolution)
        }
      },
      testing: {
        // Enables experimental simulcast support on Firefox.
        enableFirefoxSimulcast: meetingSettings.enableFirefoxSimulcast
      }
    }
  };

  return config;
};
