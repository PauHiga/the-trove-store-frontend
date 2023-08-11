import axios from "axios";

const baseUrl = "https://the-trove-store-backend.cyclic.app/api/login";

const login = async (credentials) => {
  const userLogged = await axios.post(baseUrl, credentials);
  return userLogged;
};

const loginService = { login };

export default loginService;
