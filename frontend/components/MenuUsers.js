import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import debounce from "lodash.debounce";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    width: "100%"
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
  },
  avatarInMeeting: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      top: -2,
      left: -3,
      width: 46,
      height: 40,
      background: "url('/images/headset.svg')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat"
    }
  }
}));

const MenuUsers = ({
  onChangeFilter,
  onInviteUser,
  currentUser,
  currentRoom,
  users
}) => {
  const classes = useStyles();
  const commitSearch = debounce(onChangeFilter, 300);

  return (
    <List subheader={<ListSubheader>Users Online</ListSubheader>}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search users..."
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
      {users.map(user => {
        const showInviteAction =
          currentUser.inMeet &&
          user.id !== currentUser.id &&
          !(user.inMeet && user.roomId === currentRoom.id);

        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <div
                className={clsx({
                  [classes.avatarInMeeting]: user.inMeet
                })}
              >
                <Avatar alt={user.name} src={user.avatar} />
              </div>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.roomName} />
            {showInviteAction && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Comments"
                  onClick={() => {
                    onInviteUser(user);
                  }}
                >
                  <PhoneForwardedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

MenuUsers.propTypes = {
  onChangeFilter: PropTypes.func,
  onInviteUser: PropTypes.func,
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object)
};

MenuUsers.defaultProps = {
  onChangeFilter: () => {},
  onInviteUser: () => {},
  currentUser: {},
  currentRoom: {},
  users: []
};

export default withRouter(MenuUsers);
