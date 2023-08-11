import axios from "axios";

const baseUrl = "https://the-trove-store-backend.cyclic.app/api/user";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const register = async (credentials) => {
  const userLogged = await axios.post(baseUrl, credentials);
  return userLogged;
};

const editUser = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const editedUser = await axios.put(baseUrl, credentials, config);
  return editedUser;
};

const userInfo = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const userService = { setToken, register, userInfo, editUser };

export default userService;
