import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/categories'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllCategories = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createCategory = async (newCategory) => {
  
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newCategory, config)
  return response.data
}

const editCategory = async (modifiedCategory, id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, modifiedCategory, config)
  return response.data
}

const deleteCategory = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

const categoriesService = { getAllCategories, createCategory, setToken, editCategory, deleteCategory }

export default categoriesService