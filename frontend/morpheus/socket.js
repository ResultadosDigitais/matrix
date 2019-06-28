import MatrixProfile from "../profile";
import OfficeEvents from "../office-events";

const getDefaultRoom = rooms => rooms[0].id;

const getLastRoom = (profile, rooms) => {
  let lastRoom = profile.loadStoredRoom();

  if (!lastRoom) {
    lastRoom = getDefaultRoom(rooms);
  }

  return lastRoom;
};

export const buildProfile = () => new MatrixProfile();

export const buildEvents = (profile, rooms) => {
  const domain = `${window.location.protocol}//${window.location.host}`;
  const currentUser = profile.loadStoredProfile();

  const officeEvents = new OfficeEvents({
    domain,
    currentUser,
    currentRoom: getLastRoom(profile, rooms)
  });

  return officeEvents;
};
