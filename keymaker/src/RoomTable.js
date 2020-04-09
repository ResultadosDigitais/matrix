import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Explicit from "@material-ui/icons/Explicit";
import PhoneDisabled from "@material-ui/icons/PhoneDisabled";
import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 0,
    justifyContent: "flex-end",
  },
  icon: {
    verticalAlign: "sub",
    marginLeft: theme.spacing(1),
  },
  actionCell: {
    width: 120,
  },
}));

const RoomTable = ({ onRoomDialogOpen, rooms }) => {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<Add />}
          onClick={() => onRoomDialogOpen()}
        >
          New room
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableBody>
            {rooms.map((room) => (
              <TableRow>
                <TableCell>
                  <span>{room.name}</span>
                  {room.disableMeeting && (
                    <Tooltip title="Meeting disabled">
                      <PhoneDisabled
                        fontSize="small"
                        className={classes.icon}
                      />
                    </Tooltip>
                  )}
                  {room.externalMeetUrl && (
                    <Tooltip title={room.externalMeetUrl}>
                      <Explicit fontSize="small" className={classes.icon} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell className={classes.actionCell}>
                  <Tooltip title="Edit room">
                    <IconButton
                      aria-label="Edit room"
                      onClick={() => onRoomDialogOpen(room.id)}
                    >
                      <Create fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete room">
                    <IconButton
                      aria-label="Delete room"
                      onClick={() => onRoomDialogOpen(room.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RoomTable;
