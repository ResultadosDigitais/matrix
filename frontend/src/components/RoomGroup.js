import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Collapse, Button } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Grid from "./Grid";


const useStyles = makeStyles(() => ({
  groupHeader: {
    display: "flex",
    textTransform: "none",
    margin: "20px 0",
    alignItems: "center",
    padding: 10,
    cursor: "pointer",
    outline: "none",
    "&:hover, &.focus-visible": {
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
  roomToggle: {
    marginLeft: "auto",
    flex: "0 0 auto",
  },
}));

const collapsedDefaults = JSON.parse(localStorage.getItem("collapsed-groups")) || {};

const saveCollapsed = (group, collapsed) => {
  collapsedDefaults[group] = collapsed;
  localStorage.setItem("collapsed-groups", JSON.stringify(collapsedDefaults));
}

const RoomGroup = ({ name, children }) => {
  const classes = useStyles();

  const wasOpen = collapsedDefaults[name] === undefined ? true : collapsedDefaults[name];

  const [ isOpen, setOpen ] = useState(wasOpen);
  const toggleCollapsed = () => {
    setOpen(!isOpen);
    saveCollapsed(name, !isOpen);
  }

  const useHeader = name !== "ungrouped";
  return (
    <div>
      {(useHeader &&
        // Group header
        <Button
          className={classes.groupHeader}
          title={isOpen ? "Close group" : "Open group"}
          onClick={toggleCollapsed}
          aria-expanded={String(isOpen)}
          disableFocusRipple
          focusVisibleClassName="focus-visible"
          fullWidth
        >
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          {isOpen
            ? <ExpandLessIcon className={classes.roomToggle} />
            : <ExpandMoreIcon className={classes.roomToggle} />
          }
        </Button>
      )}
      <Collapse in={isOpen}>
        <Grid>
          {children}
        </Grid>
      </Collapse>
    </div>
  );
};

RoomGroup.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

RoomGroup.defaultProps = {
  name: "",
  children: undefined,
};

export default RoomGroup;
