import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const register = async (credentials) => {
  const userLogged = await axios.post(baseUrl, credentials)
  return userLogged
}

const userService = { register }

export default userService
