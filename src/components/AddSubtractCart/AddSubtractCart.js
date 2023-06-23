import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAnotherUnitToCart, subtractUnitFromCart, removeFromCart } from '../../reducers/cartReducer';

const AddSubtractCart = ({ productId }) => {
  const dispatch = useDispatch()
  const currentProduct = useSelector(state => state.cart.find(item => item.id === productId))
  console.log(currentProduct)

  const addOne = () => {
      dispatch(addAnotherUnitToCart(currentProduct.id))
  }

  const subtractOne = () => {
    if (currentProduct.amount === 1){
      dispatch(removeFromCart(currentProduct.id))
    }
    if (currentProduct.amount > 1){
      dispatch(subtractUnitFromCart(currentProduct.id))
    }
  }
  return(
    <li key={currentProduct.id}>
      <button onClick={() => addOne()}>+</button>
      {currentProduct.amount}
      <button onClick={()=> subtractOne()}>-</button>
    </li>
  )
}

export default AddSubtractCart