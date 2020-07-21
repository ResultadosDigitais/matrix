import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

import { selectMeetingSettingByKey } from "../../store/selectors";
import { changeMeetingSetting } from "../../store/actions";
import SettingKeys from "../../../constants/MeetingSettingKeys";

const BaseMeetingSettings = ({
  micEnabled,
  onMicEnabledChange,
  videoEnabled,
  onVideoEnabledChange
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item>
        <Tooltip
          title={`${micEnabled ? t("general:disable") : t("general:enable")} ${t("meeting:mic")}`}
        >
          <Checkbox
            icon={<MicOff fontSize="large" />}
            checkedIcon={<Mic fontSize="large" />}
            onChange={onMicEnabledChange}
            checked={micEnabled}
          />
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip
          title={`${videoEnabled ? t("general:disable") : t("general:enable")} ${t("meeting:video")}`}
        >
          <Checkbox
            icon={<VideocamOff fontSize="large" />}
            checkedIcon={<Videocam fontSize="large" />}
            onChange={onVideoEnabledChange}
            checked={videoEnabled}
          />
        </Tooltip>
      </Grid>
    </>
  );
};

BaseMeetingSettings.propTypes = {
  micEnabled: PropTypes.bool.isRequired,
  onMicEnabledChange: PropTypes.func.isRequired,
  videoEnabled: PropTypes.bool.isRequired,
  onVideoEnabledChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  micEnabled: selectMeetingSettingByKey(state, SettingKeys.micEnabled),
  videoEnabled: selectMeetingSettingByKey(state, SettingKeys.videoEnabled)
});

const mapDispatchToProps = dispatch => ({
  onMicEnabledChange: event =>
    dispatch(
      changeMeetingSetting(SettingKeys.micEnabled, event.target.checked)
    ),
  onVideoEnabledChange: event =>
    dispatch(
      changeMeetingSetting(SettingKeys.videoEnabled, event.target.checked)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseMeetingSettings);
