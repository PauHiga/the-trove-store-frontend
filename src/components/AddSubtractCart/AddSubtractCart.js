import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addAnotherUnitToCart, subtractUnitFromCart, removeFromCart } from '../../reducers/cartReducer';

const StyledAddSubtract = styled.div`
  display:flex;
  width:50px;
  font-size:20px;
  justify-content: space-around;
  height:30px;
`;


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
    <div key={currentProduct.id}>
      <StyledAddSubtract>
      <p onClick={() => addOne()}>+</p>
      {currentProduct.amount}
      <p onClick={()=> subtractOne()}>-</p>
      </StyledAddSubtract>
    </div>
  )
}

export default AddSubtractCart