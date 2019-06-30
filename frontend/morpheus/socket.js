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

export const getCurrentUser = () => profile.loadStoredProfile();

export const emitEnterInRoom = roomId => {
  events.enterInRoom(roomId);
};

export const emitExitRoom = () => {
  events.enterInRoom(defaultRoomId);
};
