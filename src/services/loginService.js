import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

const login = async (credentials) => {
  console.log("login");
  const userLogged = await axios.post(baseUrl, credentials)
  return userLogged
}

const exports = { login }

export default exports
