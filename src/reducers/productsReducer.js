import { createSlice } from '@reduxjs/toolkit'
import productsService from '../services/productsService'

const initial = [
  {
  name: "Summer Dress",
  featureImg: "img01",
  description: "Summer dress",
  price: 10,
  stock: {
  S: "10",
  M: "10",
  L: "10",
  XL: "10"
  },
  section: "women",
  category: [
  {
  category: "Dress",
  id: "649f540c198131e81471f8fd"
  }
  ],
  discount: 10,
  id: "6496266fbbb32abc3047758d"
  },
  {
  name: "White Skirt Women",
  featureImg: "img url",
  description: "White skirt for Women",
  price: 30,
  stock: {
  S: 10,
  M: 10,
  L: 10,
  XL: 10
  },
  section: "women",
  category: [
  {
  category: "Skirt",
  id: "649f5411198131e81471f901"
  }
  ],
  discount: 0,
  id: "649f3bdb670c54c9d0c57070"
  },
  {
  name: "Summer shoes",
  featureImg: "img01",
  description: "Green shoes for summer",
  price: 10,
  stock: {
  S: "10",
  M: "10",
  L: "10",
  XL: "10"
  },
  section: "girls",
  category: [
  {
  category: "Dress",
  id: "649f540c198131e81471f8fd"
  }
  ],
  discount: 10,
  id: "649f5d1e198131e81471f927"
  }
  ]

const productSlice = createSlice({
  name: "products", 
  initialState: initial,
  reducers: {
    setAllProducts(state, action){
      return action.payload
    },
    createProduct(state, action){
      const content = action.payload
      state.push({
        content
      })
    },
    editProduct(state, action){
      const editedProduct = action.payload
      const newProductsArray = state.map(item => item.id !== editedProduct.id ? item : editedProduct)
      console.log("newProductsArray", newProductsArray)
      return newProductsArray
    },
    deleteProduct(state, action){
      const id = action.payload
      return state.filter(item => item.id !== id)
    }
  },
})

export const initializeProducts = () => {
  return async (dispatch) => {
    const allProducts = await productsService.getAll()
    dispatch(setAllProducts(allProducts))
  }
}

export const { setAllProducts, createProduct, editProduct, deleteProduct } = productSlice.actions
export default productSlice.reducer