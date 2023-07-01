import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../reducers/productsReducer';
import userReducer from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer';
import categoriesReducer from '../reducers/categoriesReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  }
})

export default store