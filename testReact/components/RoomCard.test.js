import React from "react";
import { render, cleanup } from "@testing-library/react";

import RoomCard from "../../frontend/components/RoomCard";

describe("components/Roomcard", () => {
  afterEach(cleanup);

  test("should render without props defined", () => {
    render(<RoomCard />);
  });

  test("should render buttons", () => {
    const { getByText } = render(<RoomCard />);

    expect(getByText(/enter room/i)).toBeTruthy();
    expect(getByText(/enter meeting/i)).toBeTruthy();
  });

  test("should render room name", () => {
    const { getByText } = render(<RoomCard name="Room test" />);

    expect(getByText("Room test")).toBeTruthy();
  });
});
