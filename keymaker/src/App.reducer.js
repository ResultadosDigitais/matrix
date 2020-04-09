import dotenv from "dotenv";

const adaptConfig = (model) => {
  const result = [];

  for (const field in model) {
    result.push(`${field}="${model[field]}"`);
  }

  const text = result.join("\n") + "\n";
  const value = `<pre><code class="bash">${text}</code></pre>`;

  return { value, text };
};

const adaptModel = (config) => {
  return dotenv.parse(config);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "change-model": {
      const model = {
        ...state.model,
        [action.field]: action.value,
      };
      return {
        config: adaptConfig(model),
        model,
      };
    }
    case "change-config": {
      return {
        config: action.config,
        model: adaptModel(action.config.text),
      };
    }
    default:
      throw new Error();
  }
};

const initialModel = {
  GOOGLE_CLIENT_ID: "",
  GOOGLE_SECRET: "",
  GOOGLE_CALLBACK_URL: "",
  ROOMS_DATA: [],
};

export const initialState = {
  config: adaptConfig(initialModel),
  model: initialModel,
};
