import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

const login = async (credentials) => {
  const userLogged = await axios.post(baseUrl, credentials);
  return userLogged;
};

const loginService = { login };

export default loginService;
