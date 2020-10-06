import React from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const AdvancedMeetingPanel = ({ children }) => (
  <Accordion elevation={0}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color="textSecondary">Advanced options</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

AdvancedMeetingPanel.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdvancedMeetingPanel;
