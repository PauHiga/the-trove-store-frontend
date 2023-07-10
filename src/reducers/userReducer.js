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
    try{
      const data = await userService.userInfo()
      dispatch(updateUser(data))
    }
    catch(error){
      console.log(error)
    }
  }
}

export const { setUser, updateUser } = userSlice.actions
export default userSlice.reducer