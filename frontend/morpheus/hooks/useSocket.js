import { useEffect } from "react";
import axios from "axios";

import {
  initProfile,
  getCurrentUser,
  emitEnterInRoom,
  getCurrentRoomId
} from "../socket";

const useSocket = (
  toggleLoading,
  setLoggedIn,
  onSetCurrentUser,
  onSetCurrentRoom,
  onAddRooms,
  onAddError
) => {
  useEffect(() => {
    const profile = initProfile();

    if (!profile.isProfileStored()) {
      window.location.href = "/";
      return;
    }

    onSetCurrentUser(getCurrentUser());

    axios
      .get("/rooms")
      .then(response => {
        const rooms = response.data;
        const savedRoomId = getCurrentRoomId();
        let currentRoom = rooms.find(r => r.id === savedRoomId);

        if (!currentRoom) {
          [currentRoom] = rooms;
          emitEnterInRoom(currentRoom.id);
        }

        onAddRooms(rooms);
        onSetCurrentRoom(currentRoom);
        setLoggedIn(true);
        toggleLoading(false);
      })
      .catch(error => {
        onAddError(error);
        toggleLoading(false);
      });
  }, [
    toggleLoading,
    setLoggedIn,
    onSetCurrentUser,
    onAddRooms,
    onAddError,
    onSetCurrentRoom
  ]);
};

export default useSocket;
