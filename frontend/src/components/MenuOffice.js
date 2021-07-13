import React from "react";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import debounce from "lodash.debounce";

import ThemeCheckbox from "./ThemeCheckbox";
import NotificationCheckbox from "./NotificationCheckbox";
import LanguageSwitcher from "./LanguageSwitcher";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const MenuOffice = ({
  onChangeFilter,
  onChangeNotification,
  onChangeTheme,
  filter,
  settings
}) => {
  const classes = useStyles();
  const commitSearch = debounce(onChangeFilter, 300);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "Search" }}
          onChange={event => {
            commitSearch("search", event.target.value);
          }}
        />
      </div>
      <Tooltip title="Show only full room">
        <Checkbox
          icon={<SupervisedUserCircle />}
          checkedIcon={<SupervisedUserCircle />}
          checked={filter.onlyFullRoom}
          onChange={event => {
            onChangeFilter("onlyFullRoom", event.target.checked);
          }}
        />
      </Tooltip>
      <ThemeCheckbox onChange={onChangeTheme} />
      <LanguageSwitcher />
      <NotificationCheckbox
        isDisabled={settings.notificationDisabled}
        onChange={onChangeNotification}
      />
    </>
  );
};

MenuOffice.propTypes = {
  onChangeFilter: PropTypes.func,
  onChangeNotification: PropTypes.func,
  onChangeTheme: PropTypes.func,
  filter: PropTypes.shape({
    onlyFullRoom: PropTypes.bool
  }),
  settings: PropTypes.shape({
    notificationDisabled: PropTypes.bool
  })
};

MenuOffice.defaultProps = {
  onChangeFilter: () => {},
  onChangeNotification: () => {},
  onChangeTheme: () => {},
  filter: {},
  settings: {}
};

export default MenuOffice;
