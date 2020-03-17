import React from "react";
import { render } from "@testing-library/react";

import List from "./";

describe("List", () => {
  it("render items", () => {
    const items = ["First item", "Second item"];
    const { container, getByText } = render(<List items={items} />);

    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(getByText("First item")).toBeInTheDocument();
    expect(getByText("Second item")).toBeInTheDocument();
  });
});
