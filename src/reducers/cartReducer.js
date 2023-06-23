import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: "cart", 
  initialState: [],
  reducers: {
    emptyCart(state, action){
      return []
    },
    addProductToCart(state, action){
      const newCartItemId = action.payload.id
      const isRepeated = state.find(item => item.id === newCartItemId)
      if(isRepeated){
        return state.map(item => item.id !== newCartItemId ? item : {...item, amount:item.amount + 1})
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
      const id = action.payload
      return state.map(item => item.id !== id ? item : {...item, amount:item.amount + 1})
    },
    subtractUnitFromCart(state, action){   
      const id = action.payload
      return state.map(item => item.id !== id ? item : {...item, amount:item.amount - 1})
    },

    removeFromCart(state, action){
      const id = action.payload
      return state.filter(item => item.id !== id)
    }
  },
})

export const { emptyCart, addProductToCart, addAnotherUnitToCart, subtractUnitFromCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer