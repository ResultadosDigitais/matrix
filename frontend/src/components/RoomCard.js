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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    color: "#fff",
    boxShadow: "0px 3px 6px #00000029",
  },
  contentAction: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  contentHeader: props => ({
    position: "relative",
    flex: 1,
    padding: 0,
    width: "100%",
    backgroundColor: props.headerColor,
    minHeight: "83px",
    display: "flex",
  }),
  contentTitle: {
    display: "flex",
    alignItems: "center",
    padding: "0 0 0 75px",
    paddingBottom: "0!important",
    width: "245px",
    backgroundColor: "transparent",
  },
  contentHexaCard: {
    position: "relative",
  },
  contentHexa: props => ({
    position: "absolute",
    top: "15px",
    left: "15px",
    padding: 0,
    width: "83px",
    height: "100px",
    backgroundColor: props.bloxColor,
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  }),
  content: {
    flex: 1,
    padding: "40px 16px 16px 16px",
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
});

const ColorButton = withStyles(() => ({
  root: {
    whiteSpace: "nowrap",
    color: "#2196f3",
    backgroundColor: "#fff",
    fontWeight: "normal",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}))(Button);

const StyledTypography = withStyles(() => ({
  root: {
    margin: "12px 0 0 0",
  },
}))(Typography);

const RoomCard = ({ name, users, headerColor, bloxColor, meetingEnabled, onEnterRoom, onEnterMeeting }) => {
  const [isExpanded, toggleExpand] = useState(false);

  const props = { headerColor, bloxColor }

  const classes = useStyles(props);
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
        <CardContent className={classes.contentHeader}>
          <CardContent className={classes.contentHexaCard}>
          <CardContent className={classes.contentHexa}  />
          </CardContent>
          <CardContent className={classes.contentTitle}>
        <StyledTypography gutterBottom variant="h5" component="h2">
            {name}
          </StyledTypography>
          </CardContent>
        </CardContent>
        <CardContent className={classes.content}>
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
        <ColorButton size="small" className={classes.margin} color="primary" onClick={onEnterRoom}>
         Entrar na sala
        </ColorButton>
        {meetingEnabled && (
          <ColorButton size="small" color="primary" onClick={onEnterMeeting}>
            Participar da aula
          </ColorButton>
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
  name: PropTypes.string,
  bloxColor: PropTypes.string,
  headerColor: PropTypes.string
};

RoomCard.defaultProps = {
  onEnterRoom: () => {},
  onEnterMeeting: () => {},
  meetingEnabled: true,
  users: [],
  name: "",
  bloxColor: "#2380C1",
  headerColor: "#2196F3"
};

export default RoomCard;
