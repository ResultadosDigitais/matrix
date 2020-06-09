import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { assert } from "chai";
import sinon from "sinon";

import RoomCard from "../../src/components/RoomCard";

describe("components/Roomcard", () => {
  afterEach(cleanup);

  it("should render without props defined", () => {
    render(<RoomCard />);
  });

  it("should render button enter room", () => {
    const onEnterRoom = sinon.fake();
    const { getByText } = render(<RoomCard onEnterRoom={onEnterRoom} />);

    fireEvent.click(getByText(/enter room/i));

    assert(onEnterRoom.calledOnce);
  });

  it("should render button enter meeting", () => {
    const onEnterMeeting = sinon.fake();
    const { getByText } = render(<RoomCard onEnterMeeting={onEnterMeeting} />);

    fireEvent.click(getByText(/enter meeting/i));

    assert(onEnterMeeting.calledOnce);
  });

  it("shouldn't render button enter meeting when meeting isn't enabled", () => {
    const { queryByText } = render(<RoomCard meetingEnabled={false} />);

    assert.isNull(queryByText(/enter meeting/i));
  });

  it("should render room name", () => {
    const { getByText } = render(<RoomCard name="Room test" />);

    assert(getByText("Room test"));
  });
});
