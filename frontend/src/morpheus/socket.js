import axios from "axios";

import MatrixProfile from "../profile";
import OfficeEvents from "../office-events";

// singletons
let profile;
let events;
let defaultRoomId;

const getLastRoom = () => {
  let lastRoom = profile.loadStoredRoom();

  if (!lastRoom) {
    lastRoom = defaultRoomId;
  }

  return lastRoom;
};

export const initProfile = () => {
  profile = new MatrixProfile();
  return profile;
};

export const initEvents = rooms => {
  const domain = `${window.location.protocol}//${window.location.host}`;
  const currentUser = profile.loadStoredProfile();

  defaultRoomId = rooms[0].id;

  events = new OfficeEvents({
    domain,
    currentUser,
    currentRoom: getLastRoom()
  });

  return events;
};

export const closeConnection = () => {
  if (events) {
    events.closeConnection();
  }
};

export const getCurrentUser = () => {
  if (!profile) {
    return undefined;
  }

  return profile.loadStoredProfile();
};

const saveCurrentUserRoom = roomId => {
  profile.storeRoom(roomId);
};

export const getCurrentRoomId = () => {
  if (!profile) {
    return undefined;
  }

  return profile.loadStoredRoom();
};

export const emitEnterInRoom = roomId => {
  if (events) {
    events.enterInRoom(roomId);
  }
  saveCurrentUserRoom(roomId);
};

export const emitStartMeeting = () => {
  events.startMeet();
};

export const emitLeftMeeting = () => {
  events.leftMeet();
};

export const emitInviteUser = userId => {
  const roomId = profile.loadStoredRoom();
  events.callUserForMyRoom(userId, roomId);
};

export const signOut = () => {
  closeConnection();

  axios.post("/auth/logout")
    .then(() => {
      profile.terminate();
      window.location.href = "./";
    })
    .catch((err) => {
      window.location.href = `./?error=${err.message}`;
    });
};
