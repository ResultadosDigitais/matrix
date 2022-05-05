import React, { useEffect } from "react";
import debounce from "lodash.debounce";

import AudioFiles from "../../constants/AudioFiles";
import SnackbarActions from "../../components/SnackbarActions";
import { showBrowserNotification } from "../../notification";
import { initEvents, closeConnection } from "../socket";

const useEvents = (
  onSyncOffice,
  onAddUser,
  onRemoveUser,
  onUserEnterMeeting,
  onUserLeftMeeting,
  enqueueSnackbar,
  closeSnackbar,
  setReceiveInviteOpen,
  setReceiveInviteAudio,
  setInvitation,
  isLoggedIn,
  rooms,
  settings,
  currentUser,
  currentRoom
) => {
  useEffect(() => {
    if (isLoggedIn) {
      const events = initEvents(rooms);

      const showNotification = debounce(message => {
        if (!settings.notificationDisabled) {
          enqueueSnackbar(message, {
            action: key => (
              <SnackbarActions
                onDismiss={() => {
                  closeSnackbar(key);
                }}
              />
            )
          });
          showBrowserNotification(message);
        }
      }, 500);

      events.onSyncOffice(onSyncOffice);
      events.onParticipantJoined((user, roomId) => {
        onAddUser(user, roomId);
        if (currentUser.id !== user.id && currentRoom.id === roomId) {
          const room = rooms.find(r => r.id === roomId);
          showNotification(`${user.name} entered ${room.name}.`);
        }
      });
      events.onParticipantStartedMeet((user, roomId) => {
        user.inMeet = true;
        onUserEnterMeeting(user, roomId);
      });
      events.onParticipantLeftMeet((user, roomId) => {
        user.inMeet = false;
        onUserLeftMeeting(user, roomId);
      });
      events.onDisconnect(userId => {
        onRemoveUser(userId);
      });
      events.onParticipantIsCalled((user, roomId) => {
        const audio = new Audio(AudioFiles.inviteNotification);
        audio.loop = true;
        audio.play();

        const room = rooms.find(r => r.id === roomId);
        setReceiveInviteOpen(true);
        setReceiveInviteAudio(audio);
        setInvitation({ user, room });
        if (!settings.notificationDisabled) {
          showBrowserNotification(
            `${user.name} is inviting you to ${room.name}`
          );
        }
      });
    }

    return () => {
      closeConnection();
    };
  }, [
    closeSnackbar,
    currentRoom.id,
    currentUser.id,
    enqueueSnackbar,
    isLoggedIn,
    onAddUser,
    onRemoveUser,
    onSyncOffice,
    onUserEnterMeeting,
    onUserLeftMeeting,
    rooms,
    setInvitation,
    setReceiveInviteOpen,
    setReceiveInviteAudio,
    settings.notificationDisabled
  ]);
};

export default useEvents;
