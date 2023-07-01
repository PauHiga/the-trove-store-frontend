import React from 'react'
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../reducers/cartReducer';
import styled from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';

const StyledProductsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  max-width: 1100px;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding-bottom:20px;
`;

const ProductsGallery = ({ products }) => {

  const dispatch = useDispatch()

  const handleAddtoCart = (product) =>{
    dispatch(addProductToCart(product))
  }
  
  return (
    <StyledProductsGallery>
        {products.map(item => {
          return(
          <div key={item.id}>
            <p>{item.id}</p>
            <ProductCard  product={item}/>
            <button onClick={()=>handleAddtoCart(item)}>Add to Cart</button>
          </div>
          )
        })
      }
    </StyledProductsGallery>
  )
}

export default ProductsGallery