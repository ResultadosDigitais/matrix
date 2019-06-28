import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const MenuUsers = ({ users }) => (
  <List subheader={<ListSubheader>Users Online</ListSubheader>}>
    {users.map(user => (
      <ListItem key={user.id}>
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.avatar} />
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItem>
    ))}
  </List>
);

MenuUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
};

MenuUsers.defaultProps = {
  users: []
};

export default MenuUsers;
