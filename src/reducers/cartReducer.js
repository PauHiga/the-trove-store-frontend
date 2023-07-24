import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: "cart", 
  initialState: [],
  reducers: {
    emptyCart(state, action){
      return []
    },
    addProductToCart(state, action){
      console.log("ap", action.payload)
      const newCartItemId = action.payload.id
      const newCartItemSize = action.payload.selectedSize
      const isRepeated = state.find(item => {
        if (item.id === newCartItemId && item.selectedSize ===  newCartItemSize){
          return true
        }
        else{
          return false
        }
      })
      console.log(isRepeated)
      if(isRepeated){
        return state.map(item => item.id !== newCartItemId && item.selectedSize !==  newCartItemSize ? item : {...item, amount:item.amount + 1})
      }
      else {
        const content = {...action.payload, amount:1}
        console.log("cart", content)
        state.push(
          content
        )
      }
    },
    addAnotherUnitToCart(state, action){   
      const newCartItemId = action.payload.id
      const newCartItemSize = action.payload.selectedSize
      return state.map(item => {
        if (item.id === newCartItemId && item.selectedSize ===  newCartItemSize){
          return {...item, amount:item.amount + 1}
        }
        else{
          return item
        }
      })
    },
    subtractUnitFromCart(state, action){   
      const newCartItemId = action.payload.id
      const newCartItemSize = action.payload.selectedSize
      return state.map(item => {
        if (item.id === newCartItemId && item.selectedSize ===  newCartItemSize){
          return {...item, amount:item.amount - 1}
        }
        else{
          return item
        }
      })
    },

    removeFromCart(state, action){
      const newCartItemId = action.payload.id
      const newCartItemSize = action.payload.selectedSize
      return state.filter(item => {
        if (item.id === newCartItemId && item.selectedSize ===  newCartItemSize){
          return false
        }
        else{
          return true
        }
      })
    }
  },
})

export const { emptyCart, addProductToCart, addAnotherUnitToCart, subtractUnitFromCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer