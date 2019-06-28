const CHANGE_USER_NAME = "CHANGE_USER_NAME";
const ADD_ROOMS = "ADD_ROOMS";
const SYNC_OFFICE = "SYNC_OFFICE";
const CHANGE_FILTER = "CHANGE_FILTER";

export const initialState = {
  userName: "",
  rooms: [],
  usersInRoom: [],
  users: [],
  office: [],
  filter: {
    onlyFullRoom: false
  }
};

const buildState = state => {
  const { rooms, usersInRoom, filter } = state;

  const office = rooms
    .map(room => ({
      id: room.id,
      name: room.name,
      users: usersInRoom.filter(u => u.room === room.id).map(u => u.user)
    }))
    .filter(o => {
      if (filter.onlyFullRoom) {
        return o.users.length > 0;
      }

      return true;
    });

  const users = usersInRoom.map(u => ({
    id: u.user.id,
    name: u.user.name,
    avatar: u.user.imageUrl
  }));

  console.log("newState", {
    ...state,
    office,
    users
  });

  return {
    ...state,
    office,
    users
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return {
        ...state,
        userName: action.name
      };
    case ADD_ROOMS:
      return buildState({
        ...state,
        rooms: action.rooms
      });
    case SYNC_OFFICE:
      return buildState({
        ...state,
        usersInRoom: Object.values(action.usersInRoom)
      });
    case CHANGE_FILTER:
      return buildState({
        ...state,
        filter: {
          ...state.filter,
          [action.key]: action.value
        }
      });
    default:
      throw new Error();
  }
};

export const changeUserName = name => ({
  type: CHANGE_USER_NAME,
  name
});

export const addRooms = rooms => ({
  type: ADD_ROOMS,
  rooms
});

export const syncOffice = usersInRoom => ({
  type: SYNC_OFFICE,
  usersInRoom
});

export const changeFilter = (key, value) => ({
  type: CHANGE_FILTER,
  key,
  value
});
