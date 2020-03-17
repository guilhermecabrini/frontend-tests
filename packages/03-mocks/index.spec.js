import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Button from ".";

describe("Button", () => {
  it("should trigger onClick prop", () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <Button onClick={onClick}>Click here!</Button>
    );

    fireEvent.click(getByText("Click here!"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
