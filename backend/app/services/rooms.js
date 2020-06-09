import fs from "fs";
import uuid from "uuid/v4";
import path from "path";
import request from "request";

const roomFilePath = "../file/matrix.room.web.json";

const createRoomFileSync = () => {
  const niceNames = [
    "The Dock",
    "Nebuchadnezzar",
    "Logos",
    "Osiris",
    "Icarus",
    "Caduceus",
    "Brahma",
    "Novalis",
    "Vigilant",
    "Zion",
  ];


  const roomsData = niceNames.map((name) => ({
    id: uuid(),
    name,
  }));

  // disable meeting for The Dock
  roomsData[0].disableMeeting = true;

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromFile = () => new Promise((resolve, reject) => {
  try {
    const roomFileExists = fs.existsSync(roomFilePath);
    if (!roomFileExists) {
      createRoomFileSync();
    }

    const roomsData = fs.readFileSync(roomFilePath);
    const roomsDetail = JSON.parse(roomsData);

    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = (env) => new Promise((resolve, reject) => {
  try {
    const roomsData = env.ROOMS_DATA;
    const roomsDetail = JSON.parse(roomsData);
    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromRemote = (env) => {
  const url = env.ROOMS_DATA;

  return new Promise(((resolve, reject) => {
    request(url, (error, response, body) => {
      // in addition to parsing the value, deal with possible errors
      if (error) return reject(error);
      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  }));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    case "REMOTE":
      return fetchFromRemote(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
