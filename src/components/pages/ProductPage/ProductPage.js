import React from 'react';
import styled from 'styled-components';
import { useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import mock from '../../../images/img1.png'
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../reducers/cartReducer';
import AddSubtractCart from '../../AddSubtractCart/AddSubtractCart';
import SectionHeader from '../../sectionHeader/SectionHeader';
import SectionsBar from '../../SectionsBar/SectionsBar';
import Button from '../../Button/Button';

const ProductPageContainer = styled.div`
  display:flex;
  min-height:65vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ce9124;
  font-variant: small-caps;
  .productContainer{
    display:flex;
  }
  .imageContainer{
    width:40vw;
    display: flex;
    justify-content: flex-end;
  }
  img {
    max-height: 50vh;
    margin-bottom:10px;
  }
  .productInfo{
    width:60vw;
    padding:30px;
  }
  .description {
    width:50vh;
    margin:10px 0px;
  }

  .inline{
    display:flex;
    align-items: center;
    margin: 10px 0px;
    .sizes{
      margin-left:20px;
    }
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

  const section = currentProduct.section.charAt(0).toUpperCase() + currentProduct.section.slice(1);

  const availableSizes = Object.keys(currentProduct.stock).filter(key => currentProduct.stock[key] > 0);

  console.log(availableSizes);

  return (
    <div>
      <SectionHeader text={section}/>
      <SectionsBar/>
      <ProductPageContainer>
        <div className="productContainer">
          <div className="imageContainer">
            <img src={mock} alt="mock" />
          </div>
          <div className="productInfo">
            <h2>{currentProduct.name}</h2>
            <h3>$ {currentProduct.price}</h3>
            <div className="inline"> 
              <Button onClick={handleAddtoCart} text="Add to Cart"/>
              {cartProduct && cartProduct.amount > 0 && (<AddSubtractCart productId={currentProduct.id}/>)}
            </div>
            <div className="inline"> 
              <p>Available sizes:</p>
              {availableSizes.map(item => <p className="sizes">{item}</p>)}
            </div>
            <p className="description">{currentProduct.description}</p>
          </div>
        </div>
      </ProductPageContainer>
    </div>
  );
};

export default ProductPage
