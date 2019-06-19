import { init as sentryInit } from "@sentry/browser";

import React from "react";
import { render } from "react-dom";
import { Office } from "./pages/office";

sentryInit({
  dsn: "https://cd95f03dd404470a8988fb776de774da@sentry.io/1441017"
});

render(<Office />, document.querySelector("#application"));
