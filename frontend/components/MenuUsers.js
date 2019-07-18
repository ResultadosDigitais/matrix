import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";

import {
  CurrentUserPropType,
  CurrentRoomPropType
} from "../morpheus/store/models";
import MenuUsersItem from "./MenuUsersItem";

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
          <MenuUsersItem
            onInviteUser={() => {
              onInviteUser(user);
            }}
            showInviteAction={showInviteAction}
            key={user.id}
            inMeeting={user.inMeet}
            id={user.id}
            name={user.name}
            avatar={user.avatar}
            roomName={user.roomName}
          />
        );
      })}
    </List>
  );
};

MenuUsers.propTypes = {
  onChangeFilter: PropTypes.func,
  onInviteUser: PropTypes.func,
  currentUser: CurrentUserPropType,
  currentRoom: CurrentRoomPropType,
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
