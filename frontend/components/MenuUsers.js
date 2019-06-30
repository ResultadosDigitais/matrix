import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";

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

const MenuUsers = ({ users, onChangeFilter }) => {
  const classes = useStyles();
  const commitSearch = debounce(onChangeFilter, 300);

  return (
    <List subheader={<ListSubheader>Users Online</ListSubheader>}>
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

      {users.map(user => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.avatar} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.roomName} />
        </ListItem>
      ))}
    </List>
  );
};

MenuUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onChangeFilter: PropTypes.func
};

MenuUsers.defaultProps = {
  users: [],
  onChangeFilter: () => {}
};

export default MenuUsers;
