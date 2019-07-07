import React from "react";
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import MenuUsers from "../../frontend/components/MenuUsers";
import { waitFor } from "../utils";

describe("components/MenuUsers", () => {
  afterEach(cleanup);

  test("should render without props defined", () => {
    render(
      <Router>
        <MenuUsers />
      </Router>
    );
  });

  test("should fire search event", () => {
    const onChangeFilter = jest.fn();
    const searchString = "Nardini";

    const { getByPlaceholderText } = render(
      <Router>
        <MenuUsers onChangeFilter={onChangeFilter} />
      </Router>
    );

    const inputNode = getByPlaceholderText("Search users...");

    fireEvent.change(inputNode, { target: { value: searchString } });

    return waitFor(500).then(() => {
      expect(onChangeFilter.mock.calls.length).toBe(1);
      expect(onChangeFilter.mock.calls[0][0]).toBe("search");
      expect(onChangeFilter.mock.calls[0][1]).toBe(searchString);
    });
  });

  test("should render user list", () => {
    const users = [{ id: 1, name: "user 1" }, { id: 2, name: "user 2" }];

    const { getByText } = render(
      <Router>
        <MenuUsers users={users} />
      </Router>
    );

    expect(getByText("user 1")).toBeTruthy();
    expect(getByText("user 2")).toBeTruthy();
  });
});
