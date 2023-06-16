import React from 'react'
import styled from 'styled-components';
import mock from './mockImage/mock.png'
import { Link } from 'react-router-dom'

const StyledProductCard = styled.nav`
  margin: 10px;
  font-variant: small-caps;
  display: flex;
  flex-direction: column;
  color: black;
  img {
    width: 232px;
    height: 330px;
    margin-bottom:10px;
  }
  h4, p {
    margin:0;
  }
`;

const ProductCard = ({product}) => {
  return (
      <StyledProductCard>
        <Link to={`/products/${product.id}/${product.name}`}>
          <img src={mock} alt="" />
          <h4>{product.name}</h4>
          <p>${product.price}</p>
        </Link>
      </StyledProductCard>
  )
}

export default ProductCard