import React, { useState } from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "../../components/Grid";
import RoomCard from "../../components/RoomCard";
import {
  selectOffice,
  selectEnvironment,
  selectCurrentRoom,
  selectRooms
} from "../store/selectors";
import { emitEnterInRoom, emitStartMeeting, emitLeftMeeting} from "../socket";
import { setCurrentRoom } from "../store/actions";
import { CurrentRoomPropType } from "../store/models";
import sha1 from '../../util/encrypt'
import Loading from "../../components/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const OfficePage = ({
  onSetCurrentRoom,
  history,
  match,
  office,
  rooms,
  environment,
  currentRoom
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  useState(() => {
    if (currentRoom && match.params.roomId !== currentRoom.id) {
      const findResult = rooms.find(r => r.id === match.params.roomId);
      if (findResult) {
        emitEnterInRoom(findResult.id);
        onSetCurrentRoom(findResult);
      } else {
        history.push("/morpheus/");
      }
    }
  }, [match.params.roomId]);

  const enteringVirtualRooom = (roomId, roomName) => {
      try {
        setIsLoading(true)
        const bbb = window.open('', '_blank')
        bbb.document.write('Carregando sala de aula, por favor aguarde...')
        const userName = JSON.parse(localStorage.getItem('user')).name
        const api = axios.create({
          baseURL: environment.url
        })

        const secret = environment.secret

        const createParams = new URLSearchParams({
          meetingID: roomId,
          name: roomName,
          attendeePW: 'ap',
          moderatorPW: environment.password || 'mp',
          muteOnStart: true,
          logoutURL: window.location.href,
          ...(environment.maxParticipants !== undefined && {maxParticipants: environment.maxParticipants}),
          ...(environment.record !== undefined && {record: environment.record}),
          ...(environment.duration !== undefined && {duration: environment.duration}),
          ...(environment.allowStartStopRecording !== undefined && {allowStartStopRecording: environment.allowStartStopRecording}),
          ...(environment.webcamsOnlyForModerator !== undefined && {webcamsOnlyForModerator: environment.webcamsOnlyForModerator}),
          ...(environment.lockSettingsDisableCam !== undefined && {lockSettingsDisableCam: environment.lockSettingsDisableCam}),
          ...(environment.presentation !== undefined && {presentation: environment.presentation}),
        })

        const createChecksum = sha1(`create${createParams.toString()}${secret}`)
        createParams.append('checksum', createChecksum)
        api.get(`/create?${createParams.toString()}`).then(() => { const joinParams = new URLSearchParams({
          meetingID: roomId,
          redirect: true,
          password: environment.alwaysModerator ? environment.password : 'ap',
          fullName: userName,
        })

        const joinChecksum = sha1(`join${joinParams.toString()}${secret}`)
        joinParams.append('checksum', joinChecksum)

        bbb.location.href = `${environment.url}/join?${joinParams.toString()}`
      })
      setIsLoading(false)
    } catch {
      console.log('não foi possível entrar na sala')
      bbb.close()
    }
  }

  return (
    isLoading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
      <Grid>
      {office.map(room => (
        <RoomCard
        {...room}
        key={room.id}
        headerColor={rooms.find(item => room.id === item.id).header_color}
        bloxColor={rooms.find(item => room.id === item.id).blox_color}
        onEnterRoom={() => {
          emitEnterInRoom(room.id);
          onSetCurrentRoom(room);
          history.replace(`/morpheus/office/${room.id}`);
        }}
        enteringVirtualRooom={enteringVirtualRooom}
        />
        ))}
        </Grid>
        </div>
    )
  );
};

OfficePage.propTypes = {
  onSetCurrentRoom: PropTypes.func,
  office: PropTypes.arrayOf(PropTypes.object),
  rooms: PropTypes.arrayOf(PropTypes.object),
  environment: PropTypes.shape({
    url: PropTypes.string,
    secret: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string
    }).isRequired
  }).isRequired,
  currentRoom: CurrentRoomPropType
};

OfficePage.defaultProps = {
  onSetCurrentRoom: () => {},
  office: [],
  rooms: [],
  environment: {},
  currentRoom: {}
};

const mapStateToProps = state => ({
  office: selectOffice(state),
  rooms: selectRooms(state),
  environment: selectEnvironment(state),
  currentRoom: selectCurrentRoom(state)
});

const mapDispatchToProps = {
  onSetCurrentRoom: setCurrentRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficePage);
