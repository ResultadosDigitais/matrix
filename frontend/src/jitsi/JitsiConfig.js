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
    },
    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      SHOW_BRAND_WATERMARK: false
    }
  };

  return config;
};
