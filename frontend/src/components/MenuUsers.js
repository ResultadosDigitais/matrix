import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
    width: "100%",
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

  const { t } = useTranslation();

  return (
    <List subheader={<ListSubheader>{t("general:online-users")}</ListSubheader>}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`${t("general:search-users")}...`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": t("general:search") }}
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
