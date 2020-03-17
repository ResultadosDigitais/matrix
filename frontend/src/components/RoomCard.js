import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  contentAction: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  content: {
    flex: 1
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 40px)",
    gridGap: 8
  },
  emptyUserSpace: {
    height: 0
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

const RoomCard = ({ name, users, meetingEnabled, onEnterRoom, onEnterMeeting }) => {
  const [isExpanded, toggleExpand] = useState(false);
  const classes = useStyles();
  const userToShow = isExpanded ? users : users.slice(0, 3);
  const totalUsersHidden = users.length - userToShow.length;

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.contentAction}
        onClick={() => {
          toggleExpand(!isExpanded);
        }}
      >
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <div className={classes.userGrid}>
            {userToShow.map(user => (
              <Tooltip key={user.id} title={user.name}>
                <div
                  className={clsx({
                    [classes.avatarInMeeting]: user.inMeet
                  })}
                >
                  <Avatar src={decodeURIComponent(user.imageUrl)} />
                </div>
              </Tooltip>
            ))}
            {totalUsersHidden > 0 && (
              <Tooltip title={`more ${totalUsersHidden} users`}>
                <Avatar>{`+${totalUsersHidden}`}</Avatar>
              </Tooltip>
            )}
            {users.length === 0 && <div className={classes.emptyUserSpace} />}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onEnterRoom}>
          Enter room
        </Button>
        {meetingEnabled && (
          <Button size="small" color="primary" onClick={onEnterMeeting}>
            Enter meeting
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

RoomCard.propTypes = {
  onEnterRoom: PropTypes.func,
  onEnterMeeting: PropTypes.func,
  meetingEnabled: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string
};

RoomCard.defaultProps = {
  onEnterRoom: () => {},
  onEnterMeeting: () => {},
  meetingEnabled: true,
  users: [],
  name: ""
};

export default RoomCard;
