import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [];

  roomsData[0] = {
    id: uuid(),
    name: "The Dock",
    disableMeeting: true,
  };

  const niceNames = [
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

  for (const niceName of niceNames) {
    roomsData.push({
      id: uuid(),
      name: niceName
    });
  }

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const fetchAll = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

const create = (req, res) => {
  const newRoom = {
    id: req.query.roomId,
    name: req.query.roomName,
    disableMeeting: false,
    temporary: true,
  };

  const found = req.app.locals.roomsDetail.find(
    element => element.id == req.query.roomId,
  );

  if (!found) {
    req.app.locals.roomsDetail.splice(1, 0, newRoom);
  }

  res.redirect(`/morpheus/room/${req.query.roomId}`);
};

const remove = (req, res) => {
  req.app.locals.roomsDetail = req.app.locals.roomsDetail.filter(
    value => value.id !== req.query.roomId || value.temporary !== true,
  );

  res.redirect(`/office#${req.app.locals.roomsDetail[0].id}`);
};

const list = (req, res) => {
  res.json(req.app.locals.roomsDetail);
};

export default {
  list,
  create,
  remove,
  fetchAll,
};
