import React from "react";

import {
  render,
  fireEvent,
  waitForElement,
  waitForDomChange,
  act
} from "@testing-library/react";

import SearchGithubUserForm from "./";
import * as api from "./services/github";

jest.mock("./services/github");

const flushPromises = () => new Promise(resolve => setTimeout(resolve));

describe("SearchGithubUserForm", () => {
  it("show github user name", async () => {
    const userMock = {
      name: "Guilherme Cabrini da Silva"
    };
    api.getUserByGithubLogin.mockResolvedValueOnce(userMock);
    const { getByTestId, getByLabelText, getByText, rerender } = render(
      <SearchGithubUserForm />
    );
    const userLogin = "guilhermecabrini";

    fireEvent.change(getByLabelText("User login:"), {
      target: { value: userLogin }
    });
    fireEvent.submit(getByTestId("search-form"));

    waitForElement(() => getByTestId("search-name-display"));

    await flushPromises();

    expect(getByTestId("search-name-display")).toHaveTextContent(userMock.name);
  });
});
