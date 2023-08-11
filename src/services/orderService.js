import axios from "axios";
const baseUrl = "https://the-trove-store-backend.cyclic.app/api/orders";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllOrders = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createOrder = async (newOrder) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newOrder, config);
  return response.data;
};

const editOrder = async (modifiedOrder, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, modifiedOrder, config);
  return response.data;
};

const orderService = { setToken, getAllOrders, createOrder, editOrder };

export default orderService;
