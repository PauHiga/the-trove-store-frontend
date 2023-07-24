import React from 'react'
import styled from 'styled-components';
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
  .crossed{
    text-decoration: line-through
  }
`;

const ProductCard = ({product}) => {
  const totalPrice = product.price-(product.price*product.discount/100)

  return (
      <StyledProductCard>
        <Link to={`/products/${product.id}`}>
          <img src={product.featureImg} alt="" />
          <h4>{product.name}</h4>
          {product.discount >0 ? 
          <>
            <p className='crossed'>${product.price}</p>
          </>
          : ''
          }
          <p>${totalPrice}</p>
        </Link>
      </StyledProductCard>
  )
}

export default ProductCard