import React from 'react'
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../reducers/cartReducer';
import styled from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';
import Button from '../Button/Button';

const StyledProductsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding-bottom:20px;
  .product{
    text-align:center;
    padding:20px;
  }
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
          <div className="product" key={item.id}>
            <ProductCard  product={item}/>
            {/* <Button onClick={()=>handleAddtoCart(item)} text="Add to Cart"/> */}
          </div>
          )
        })
      }
    </StyledProductsGallery>
  )
}

export default ProductsGallery