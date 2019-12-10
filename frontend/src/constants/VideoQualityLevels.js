const VideoQualityLevels = {
  high: 1080,
  standard: 360,
  low: 180
};

const formatOption = (level, label, standard = false) => ({
  value: `${level}`,
  label: `${label} (${level})`,
  standard
});

export const getVideoQualityLevelsOptions = () => [
  formatOption(VideoQualityLevels.high, "High definition"),
  formatOption(VideoQualityLevels.standard, "Standard definition", true),
  formatOption(VideoQualityLevels.low, "Low definition")
];

export default VideoQualityLevels;
