import React from "react";
import { render } from "@testing-library/react";

import RoundedCard from "./";

describe("RoundedCard", () => {
  it("render properly", () => {
    const { container } = render(<RoundedCard>foo</RoundedCard>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
