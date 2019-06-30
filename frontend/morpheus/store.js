const CHANGE_USER_NAME = "CHANGE_USER_NAME";
const ADD_ROOMS = "ADD_ROOMS";
const SYNC_OFFICE = "SYNC_OFFICE";
const CHANGE_OFFICE_FILTER = "CHANGE_OFFICE_FILTER";

export const initialState = {
  userName: "",
  rooms: [],
  usersInRoom: [],
  users: [],
  office: [],
  filter: {
    onlyFullRoom: false,
    search: ""
  }
};

const buildOfficeState = state => {
  const { rooms, usersInRoom, filter } = state;

  let office = rooms.map(room => ({
    id: room.id,
    name: room.name,
    users: usersInRoom.filter(u => u.room === room.id).map(u => u.user)
  }));

  if (filter.onlyFullRoom) {
    office = office.filter(o => o.users.length > 0);
  }
  if (filter.search) {
    const search = filter.search.toLowerCase();
    office = office.filter(o => o.name.toLowerCase().includes(search));
  }

  return {
    ...state,
    office
  };
};

const buildUsersState = state => {
  const { usersInRoom } = state;

  const users = usersInRoom.map(u => ({
    id: u.user.id,
    name: u.user.name,
    avatar: u.user.imageUrl
  }));

  return {
    ...state,
    users
  };
};

const reducerLogic = (state, action) => {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return {
        ...state,
        userName: action.name
      };
    case ADD_ROOMS:
      return buildOfficeState({
        ...state,
        rooms: action.rooms
      });
    case SYNC_OFFICE:
      return buildUsersState(
        buildOfficeState({
          ...state,
          usersInRoom: Object.values(action.usersInRoom)
        })
      );
    case CHANGE_OFFICE_FILTER:
      return buildOfficeState({
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

export const reducer = (state, action) => {
  const newState = reducerLogic(state, action);

  console.log(action.type, newState);

  return newState;
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

export const changeOfficeFilter = (key, value) => ({
  type: CHANGE_OFFICE_FILTER,
  key,
  value
});
