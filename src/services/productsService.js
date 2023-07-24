import axios from "axios";
const baseUrl = "http://localhost:3001/api/products";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getProduct = async (id) => {
  const request = await axios.get(baseUrl + "/" + id);
  return request.data;
};

const createProduct = async (newProduct) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newProduct, config);
  return response.data;
};

const editProduct = async (modifiedProduct, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, modifiedProduct, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + "/" + id, config);
  return response.data;
};

const productsService = {
  getAll,
  createProduct,
  setToken,
  editProduct,
  deleteProduct,
  getProduct,
};

export default productsService;
