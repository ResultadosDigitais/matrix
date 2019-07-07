import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import MenuUsers from "../../frontend/components/MenuUsers";

describe("components/MenuUsers", () => {
  afterEach(cleanup);

  test("should render without props defined", () => {
    render(
      <Router>
        <MenuUsers />
      </Router>
    );
  });
});
