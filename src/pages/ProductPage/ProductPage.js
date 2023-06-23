import React from 'react';
import styled from 'styled-components';
import { useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import mock from '../../images/img1.png'
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../reducers/cartReducer';
import AddSubtractCart from '../../components/AddSubtractCart/AddSubtractCart';

const ProductPageContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  width: 70%;
  max-width: 1100px;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding:20px;
  img {
    width: 232px;
    height: 330px;
    margin-bottom:10px;
  }
`;

const ProductPage = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  
  const currentProduct = useSelector(state => state.products.find(item => item.id === id))
  const cartProduct = useSelector(state => state.cart.find(item => item.id === id))

  const handleAddtoCart = () =>{
    dispatch(addProductToCart(currentProduct))
  }       

  return (
 
    <ProductPageContainer>
      <h2>{currentProduct.name}</h2>
      <img src={mock} alt="mock" />
      <p>{currentProduct.description}</p>
      <p>{currentProduct.price}</p>
      <button onClick={handleAddtoCart}>Add to Cart</button>
      {cartProduct && cartProduct.amount > 0 && (<AddSubtractCart productId={currentProduct.id}/>)}

    </ProductPageContainer>
  );
};

export default ProductPage
