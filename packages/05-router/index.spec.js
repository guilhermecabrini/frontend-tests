import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

import { LocationDisplay, App } from "./";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(container.innerHTML).toMatch("You are home");

  fireEvent.click(getByText(/about/i));

  expect(container.innerHTML).toMatch("You are on the about page");
});

test("landing on a bad page shows 404 page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByRole("heading")).toHaveTextContent("404 Not Found");
});

test("rendering a component that uses withRouter", () => {
  const history = createMemoryHistory();
  const route = "/some-route";
  history.push(route);
  const { getByTestId } = render(
    <Router history={history}>
      <LocationDisplay />
    </Router>
  );
  expect(getByTestId("location-display")).toHaveTextContent(route);
});
