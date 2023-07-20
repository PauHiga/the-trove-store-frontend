import React from 'react'
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../reducers/cartReducer';
import styled from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';

const StyledProductsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding-bottom:20px;
  max-width: 1400px;

  .product{
    text-align:center;
    padding:20px;
  }

  @media (max-width: 480px) { 
    .product{
      padding:0px;
    }
  }
`;

const ProductsGallery = ({ products }) => {
  
  return (
    <StyledProductsGallery>
        {products.map(item => {
          return(
          <div className="product" key={item.id}>
            <ProductCard  product={item}/>
          </div>
          )
        })
      }
    </StyledProductsGallery>
  )
}

export default ProductsGallery