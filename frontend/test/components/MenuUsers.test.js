import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { assert } from "chai";
import sinon from "sinon";

import MenuUsers from "../../src/components/MenuUsers";

const waitFor = milliseconds =>
  new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });

describe("components/MenuUsers", () => {
  afterEach(cleanup);

  it("should render without props defined", () => {
    render(
      <Router>
        <MenuUsers />
      </Router>
    );
  });

  it("should fire search event", () => {
    const onChangeFilter = sinon.fake();
    const searchString = "Nardini";

    const { getByPlaceholderText } = render(
      <Router>
        <MenuUsers onChangeFilter={onChangeFilter} />
      </Router>
    );

    const inputNode = getByPlaceholderText("Search users...");
    fireEvent.change(inputNode, { target: { value: searchString } });

    return waitFor(500).then(() => {
      assert(onChangeFilter.calledOnce);
      assert(onChangeFilter.calledWith("search", searchString));
    });
  });

  it("should render user list", () => {
    const users = [{ id: 1, name: "user 1" }, { id: 2, name: "user 2" }];
    const { getByText } = render(
      <Router>
        <MenuUsers users={users} />
      </Router>
    );

    assert(getByText("user 1"));
    assert(getByText("user 2"));
  });
});
