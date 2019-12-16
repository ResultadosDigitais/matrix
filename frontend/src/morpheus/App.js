import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import MenuUsers from "../components/MenuUsers";
import InviteToMeetingDialog from "../components/InviteToMeetingDialog";
import ReceiveInviteDialog from "../components/ReceiveInviteDialog";
import MessageDialog from "../components/MessageDialog";
import Error500 from "../components/Error500";
import PageRoutes, { AppBarRouter } from "./Routes";
import ConfirmLogoutDialog from "./containers/ConfirmLogoutDialog";

import { emitEnterInRoom, emitInviteUser } from "./socket";
import {
  setCurrentUser,
  setCurrentRoom,
  addRooms,
  syncOffice,
  changeUsersFilter,
  addUser,
  addError,
  removeUser,
  userEnterMeeting,
  userLeftMeeting
} from "./store/actions";
import {
  selectRooms,
  selectCurrentUser,
  selectUsers,
  selectUsersFilter,
  selectCurrentRoom,
  selectError,
  selectSystemSettings,
  selectTheme
} from "./store/selectors";
import {
  CurrentRoomPropType,
  RoomsPropType,
  CurrentUserPropType,
  SettingsPropType,
  UsersPropType,
  UsersFilterPropType,
  ErrorPropType
} from "./store/models";
import useSocket from "./hooks/useSocket";
import useEvents from "./hooks/useEvents";

const MorpheusApp = ({
  onChangeUsersFilter,
  onSetCurrentUser,
  onSetCurrentRoom,
  onAddRooms,
  onSyncOffice,
  onAddUser,
  onAddError,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  history,
  currentRoom,
  settings,
  rooms,
  currentUser,
  users,
  usersFilter,
  error
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, toggleLoading] = useState(true);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [userToInvite, setUserToInvite] = useState();
  const [isReceiveInviteOpen, setReceiveInviteOpen] = useState(false);
  const [invitation, setInvitation] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useSocket(
    toggleLoading,
    setLoggedIn,
    onSetCurrentUser,
    onSetCurrentRoom,
    onAddRooms,
    onAddError
  );
  useEvents(
    onSyncOffice,
    onAddUser,
    onRemoveUser,
    onUserEnterMeeting,
    onUserLeftMeeting,
    enqueueSnackbar,
    closeSnackbar,
    setReceiveInviteOpen,
    setInvitation,
    isLoggedIn,
    rooms,
    settings,
    currentUser,
    currentRoom
  );

  if (error) {
    return (
      <Error500
        onReload={() => {
          window.location.reload();
        }}
      />
    );
  }

  return (
    <>
      <PageLayout
        renderAppBarMenu={() => <AppBarRouter />}
        renderSideBarMenu={() => (
          <MenuUsers
            users={users}
            filter={usersFilter}
            currentUser={currentUser}
            currentRoom={currentRoom}
            onChangeFilter={(key, value) => {
              onChangeUsersFilter(key, value);
            }}
            onInviteUser={user => {
              setUserToInvite(user);
              setInviteModalOpen(true);
            }}
          />
        )}
      >
        {isLoading ? <Loading /> : <PageRoutes />}
      </PageLayout>
      <InviteToMeetingDialog
        open={isInviteModalOpen}
        user={userToInvite}
        currentRoomName={currentRoom.name}
        onClose={() => {
          setInviteModalOpen(false);
        }}
        onConfirm={() => {
          emitInviteUser(userToInvite.id);
        }}
      />
      <ReceiveInviteDialog
        open={isReceiveInviteOpen}
        invitation={invitation}
        onClose={() => {
          setReceiveInviteOpen(false);
        }}
        onConfirm={() => {
          emitEnterInRoom(invitation.room.id);
          history.push(`/morpheus/room/${invitation.room.id}`);
        }}
      />
      <MessageDialog />
      <ConfirmLogoutDialog />
    </>
  );
};

MorpheusApp.propTypes = {
  onChangeUsersFilter: PropTypes.func,
  onSetCurrentUser: PropTypes.func,
  onSetCurrentRoom: PropTypes.func,
  onAddRooms: PropTypes.func,
  onSyncOffice: PropTypes.func,
  onAddUser: PropTypes.func,
  onAddError: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onUserEnterMeeting: PropTypes.func,
  onUserLeftMeeting: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  currentRoom: CurrentRoomPropType.isRequired,
  rooms: RoomsPropType.isRequired,
  currentUser: CurrentUserPropType.isRequired,
  users: UsersPropType.isRequired,
  usersFilter: UsersFilterPropType.isRequired,
  settings: SettingsPropType.isRequired,
  error: ErrorPropType
};

MorpheusApp.defaultProps = {
  onChangeUsersFilter: () => {},
  onSetCurrentUser: () => {},
  onSetCurrentRoom: () => {},
  onAddRooms: () => {},
  onSyncOffice: () => {},
  onAddUser: () => {},
  onAddError: () => {},
  onRemoveUser: () => {},
  onUserEnterMeeting: () => {},
  onUserLeftMeeting: () => {},
  error: undefined
};

const mapStateToProps = state => ({
  theme: selectTheme(state),
  currentRoom: selectCurrentRoom(state),
  rooms: selectRooms(state),
  currentUser: selectCurrentUser(state),
  users: selectUsers(state),
  usersFilter: selectUsersFilter(state),
  settings: selectSystemSettings(state),
  error: selectError(state)
});

const mapDispatchToProps = {
  onChangeUsersFilter: changeUsersFilter,
  onSetCurrentUser: setCurrentUser,
  onSetCurrentRoom: setCurrentRoom,
  onAddRooms: addRooms,
  onSyncOffice: syncOffice,
  onAddUser: addUser,
  onAddError: addError,
  onRemoveUser: removeUser,
  onUserEnterMeeting: userEnterMeeting,
  onUserLeftMeeting: userLeftMeeting
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MorpheusApp)
);
