import React, { useState } from "react";

import { getUserByGithubLogin } from "./services/github";

export default function SearchGithubUserForm() {
  const [name, setName] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault();

    const userLogin = event.target.elements.userLogin.value;

    getUserByGithubLogin(userLogin).then(({ name }) => {
      setName(name);
    });
  };

  return (
    <>
      <form
        onSubmit={event => handleFormSubmit(event)}
        data-testid="search-form"
      >
        <label htmlFor="userLogin">User login:</label>
        <input type="text" name="userLogin" id="userLogin" />

        <button type="submit">Find</button>
      </form>

      {!!name && <p data-testid="search-name-display">{name}</p>}
    </>
  );
}
