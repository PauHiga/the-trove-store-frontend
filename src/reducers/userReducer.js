import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const userSlice = createSlice({
  name: "user", 
  initialState:'',
  reducers: {
    setUser(state, action){
      return action.payload
    },
    updateUser(state, action){
      return {...state, ...action.payload}
    }
  }
})

export const getUserInfo = () => {
  return async (dispatch) => {
    const data = await userService.userInfo()
    dispatch(updateUser(data))
  }
}

export const { setUser, updateUser } = userSlice.actions
export default userSlice.reducer