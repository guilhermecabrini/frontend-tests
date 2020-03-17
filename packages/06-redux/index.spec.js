import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import { initialState, reducer } from "./reducer.js";
import Counter from "./";

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

test("can render with redux with defaults", () => {
  const { getByTestId, getByText } = renderWithRedux(<Counter />);
  fireEvent.click(getByText("+"));

  expect(getByTestId("count-value")).toHaveTextContent("1");
});

test("can render with redux with custom initial state", () => {
  const { getByTestId, getByText } = renderWithRedux(<Counter />, {
    initialState: { count: 3 }
  });
  fireEvent.click(getByText("-"));

  expect(getByTestId("count-value")).toHaveTextContent("2");
});

test("can render with redux with custom store", () => {
  const store = createStore(() => ({ count: 1000 }));
  const { getByTestId, getByText } = renderWithRedux(<Counter />, {
    store
  });

  fireEvent.click(getByText("+"));
  expect(getByTestId("count-value")).toHaveTextContent("1000");

  fireEvent.click(getByText("-"));
  expect(getByTestId("count-value")).toHaveTextContent("1000");
});
