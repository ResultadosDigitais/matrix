import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";

import RoomCard from "../../frontend/components/RoomCard";

describe("components/Roomcard", () => {
  afterEach(cleanup);

  test("should render without props defined", () => {
    render(<RoomCard />);
  });

  test("should render button enter room", () => {
    const onEnterRoom = jest.fn();
    const { getByText } = render(<RoomCard onEnterRoom={onEnterRoom} />);

    fireEvent.click(getByText(/enter room/i));

    expect(onEnterRoom.mock.calls.length).toBe(1);
  });

  test("should render button enter meeting", () => {
    const onEnterMeeting = jest.fn();
    const { getByText } = render(<RoomCard onEnterMeeting={onEnterMeeting} />);

    fireEvent.click(getByText(/enter meeting/i));

    expect(onEnterMeeting.mock.calls.length).toBe(1);
  });

  test("should render room name", () => {
    const { getByText } = render(<RoomCard name="Room test" />);

    expect(getByText("Room test")).toBeTruthy();
  });
});
