import axios from "axios";

export function getUserByGithubLogin(login) {
  return axios.get(`https://api.github.com/users/${login}`);
}
