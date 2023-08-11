import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/productsService";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setAllProducts(state, action) {
      return action.payload;
    },
    createProduct(state, action) {
      const content = action.payload
      state.push({ ...content })
    },
    editProduct(state, action) {
      const editedProduct = action.payload
      const newProductsArray = state.map(item => item.id !== editedProduct.id ? item : editedProduct)
      return newProductsArray
    },
    deleteProduct(state, action) {
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