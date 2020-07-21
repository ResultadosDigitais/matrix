import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { selectMeetingSettingByKey } from "../../store/selectors";
import { changeMeetingSetting } from "../../store/actions";
import SettingKeys from "../../../constants/MeetingSettingKeys";
import Select from "../../../components/Select";
import { getResolutionLevelsOptions } from "../../../constants/ResolutionLevels";

const AdvancedMeetingSettings = ({
  videoQualityOptions,
  videoQualityValue,
  onVideoQualityChange,
  enableFirefoxSimulcast,
  onEnableFirefoxSimulcastChange
}) => {

  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Select
          label={t("meeting:resolution")}
          options={videoQualityOptions}
          value={videoQualityValue}
          onChange={onVideoQualityChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Switch
              checked={enableFirefoxSimulcast}
              onChange={onEnableFirefoxSimulcastChange}
              color="secondary"
            />
          }
          label={t("meeting:simulcast-support")}
        />
      </Grid>
    </Grid>
  );
};

AdvancedMeetingSettings.propTypes = {
  videoQualityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  videoQualityValue: PropTypes.string.isRequired,
  onVideoQualityChange: PropTypes.func.isRequired,
  enableFirefoxSimulcast: PropTypes.bool.isRequired,
  onEnableFirefoxSimulcastChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  videoQualityOptions: getResolutionLevelsOptions(),
  videoQualityValue: selectMeetingSettingByKey(state, SettingKeys.resolution),
  enableFirefoxSimulcast: selectMeetingSettingByKey(
    state,
    SettingKeys.enableFirefoxSimulcast
  )
});

const mapDispatchToProps = dispatch => ({
  onVideoQualityChange: event =>
    dispatch(changeMeetingSetting(SettingKeys.resolution, event.target.value)),
  onEnableFirefoxSimulcastChange: event =>
    dispatch(
      changeMeetingSetting(
        SettingKeys.enableFirefoxSimulcast,
        event.target.checked
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedMeetingSettings);
