const ResolutionLevels = {
  hd: 720,
  sd: 360,
  ld: 180
};

const formatOption = (level, label, standard = false) => ({
  value: `${level}`,
  label: `${label} (${level})`,
  standard
});

export const getResolutionLevelsOptions = () => [
  formatOption(ResolutionLevels.hd, "High Definition"),
  formatOption(ResolutionLevels.sd, "Standard Definition", true),
  formatOption(ResolutionLevels.ld, "Low Definition")
];

export const getVideoHeight = resolution =>
  resolution === ResolutionLevels.ld
    ? {
        ideal: 180,
        max: 180,
        min: 180
      }
    : {
        ideal: resolution,
        max: 720,
        min: 240
      };

export default ResolutionLevels;
