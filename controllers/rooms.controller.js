import fs from "fs";

// const fetchFromFile = () => {
//   const roomsData = fs.readFileSync("./file/default.room.web.json");
//   const roomsDetail = JSON.parse(roomsData);
//
//   return new Promise((resolve, reject) => resolve(roomsDetail));
// };

const fetchFromEnvironment = env => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve, reject) => resolve(roomsDetail));
};

const fetchRooms = strategy => {
  return fetchFromEnvironment(process.env);

  // switch (strategy) {
    //TODO add suport to fetch from endpoint
    // case "ENVIRONMENT":
    //   return fetchFromEnvironment(process.env);
    // default:
    //   return fetchFromFile();
    // default:
  // }
};

export default fetchRooms;
