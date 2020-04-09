import dotenv from "dotenv";
import uuid from "uuid/v4";

export const actions = {
  changeModel: "change-model",
  changeConfig: "change-config",
  openRoomDialog: "open-room-room",
  closeRoomDialog: "close-room-dialog",
  deleteRoom: "delete-room",
  submitRoomDialog: "submit-room-dialog",
  changeRoomInDialog: "change-room-in-dialog",
};

const jsonArrayFields = ["ROOMS_DATA", "WHITELIST_DOMAINS"];
const primitiveFields = ["ENFORCE_SSL", "PORT", "COOKIE_SESSION_MAX_AGE"];

const adaptConfig = (model) => {
  const result = [];

  for (const field in model) {
    if (field === "errors") {
      continue;
    } else if (jsonArrayFields.includes(field)) {
      result.push(`${field}=${JSON.stringify(model[field])}`);
    } else if (primitiveFields.includes(field)) {
      result.push(`${field}=${model[field]}`);
    } else {
      result.push(`${field}="${model[field]}"`);
    }
  }

  const text = result.join("\n") + "\n";
  const value = `<pre><code class="bash">${text}</code></pre>`;

  return { value, text };
};

const adaptModel = (config) => {
  const model = dotenv.parse(config);
  model.errors = {};

  jsonArrayFields.forEach((field) => {
    if (model[field]) {
      try {
        model[field] = JSON.parse(model[field]);
      } catch (e) {
        model[field] = [];
        model.errors[field] = `Unable to parse ${field}`;
      }
    }
  });

  return model;
};

const findRoom = (state, id) => state.model.ROOMS_DATA.find((r) => r.id === id);

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.changeModel: {
      const model = {
        ...state.model,
        [action.field]: action.value,
      };
      return {
        ...state,
        config: adaptConfig(model),
        model,
      };
    }
    case actions.changeConfig:
      return {
        ...state,
        config: action.config,
        model: adaptModel(action.config.text),
      };
    case actions.openRoomDialog:
      return {
        ...state,
        roomDialog: {
          open: true,
          room: action.id ? findRoom(state, action.id) : {},
        },
      };
    case actions.closeRoomDialog:
      return {
        ...state,
        roomDialog: {
          open: false,
          room: {},
        },
      };
    case actions.submitRoomDialog: {
      const { id } = state.roomDialog.room;
      let newRooms;

      if (id) {
        newRooms = state.model.ROOMS_DATA.slice();
        const index = newRooms.findIndex((r) => r.id === id);
        newRooms[index] = state.roomDialog.room;
      } else {
        newRooms = [].concat(state.model.ROOMS_DATA, {
          id: uuid(),
          ...state.roomDialog.room,
        });
      }

      const model = {
        ...state.model,
        ROOMS_DATA: newRooms,
      };

      return {
        ...state,
        model,
        config: adaptConfig(model),
        roomDialog: {
          open: false,
          room: {},
        },
      };
    }
    case actions.changeRoomInDialog: {
      const room = {
        ...state.roomDialog.room,
        [action.key]: action.value,
      };

      if (room.disableMeeting) {
        delete room.externalMeetUrl;
      }

      return {
        ...state,
        roomDialog: {
          ...state.roomDialog,
          room,
        },
      };
    }
    case actions.deleteRoom: {
      const newRooms = state.model.ROOMS_DATA;
      const index = newRooms.findIndex((r) => r.id === action.id);

      newRooms.splice(index, 1);

      const model = {
        ...state.model,
        ROOMS_DATA: newRooms,
      };

      return {
        ...state,
        model,
        config: adaptConfig(model),
      };
    }
    default:
      throw new Error();
  }
};

const initialModel = {
  errors: {},
  GOOGLE_CLIENT_ID: "",
  GOOGLE_SECRET: "",
  GOOGLE_CALLBACK_URL: "",
  WHITELIST_DOMAINS: [],
  ENVIRONMENT: "",
  COOKIE_SESSION_SECRET: "matrix-session",
  COOKIE_SESSION_MAX_AGE: 30 * 24 * 60 * 60 * 1000,
  ENFORCE_SSL: false,
  HOST: "0.0.0.0",
  PORT: process.env.PORT || 8080,
  ROOMS_DATA: [],
};

export const initialState = {
  config: adaptConfig(initialModel),
  model: initialModel,
  roomDialog: {
    open: false,
    room: {},
  },
};
