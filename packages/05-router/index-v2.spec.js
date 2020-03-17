import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

import { LocationDisplay, App } from "./";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  };
}

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  const { container, getByText } = renderWithRouter(<App />, { route: "/" });

  expect(container.innerHTML).toMatch("You are home");

  fireEvent.click(getByText(/about/i));

  expect(container.innerHTML).toMatch("You are on the about page");
});

test("landing on a bad page shows 404 page", () => {
  const { history, getByRole } = renderWithRouter(<App />, {
    route: "/some/bad/route"
  });

  expect(getByRole("heading")).toHaveTextContent("404 Not Found");
});

test("rendering a component that uses withRouter", () => {
  const route = "/some-route";
  const { getByTestId } = renderWithRouter(<LocationDisplay />, { route });

  expect(getByTestId("location-display")).toHaveTextContent(route);
});
