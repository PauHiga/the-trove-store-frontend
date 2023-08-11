import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnotherUnitToCart,
  subtractUnitFromCart,
  removeFromCart,
} from "../../reducers/cartReducer";

const StyledAddSubtract = styled.div`
  display: flex;
  width: 50px;
  justify-content: space-around;
  height: 30px;
`;

const AddSubtractCart = ({ product }) => {
  const dispatch = useDispatch();

  const addOne = () => {
    if (product.amount < product.stock[product.selectedSize]) {
      dispatch(addAnotherUnitToCart(product));
    }
  };

  const subtractOne = () => {
    if (product.amount === 1) {
      dispatch(removeFromCart(product));
    }
    if (product.amount > 1) {
      dispatch(subtractUnitFromCart(product));
    }
  };

  return (
    <div key={`${product.id}${product.selectedSize}`}>
      <StyledAddSubtract>
        <p onClick={() => addOne()}>+</p>
        {product.amount}
        <p onClick={() => subtractOne()}>-</p>
      </StyledAddSubtract>
    </div>
  );
};

export default AddSubtractCart;
