import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

const AdvancedMeetingPanel = ({ children }) => {
  const { t } = useTranslation();

  return (
    <ExpansionPanel elevation={0}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="textSecondary">{t("meeting:advanced-options")}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

AdvancedMeetingPanel.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdvancedMeetingPanel;
