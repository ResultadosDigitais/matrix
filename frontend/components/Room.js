import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const Room = ({ name, users, onClick }) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <div>
          {users.map(user => (
            <Avatar key={user.id} src={user.imageUrl} />
          ))}
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
);

Room.propTypes = {
  name: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func
};

Room.defaultProps = {
  name: "",
  users: [],
  onClick: undefined
};

export default Room;
