import styled from 'styled-components';
import AddSubtractCart from '../../../AddSubtractCart/AddSubtractCart';

const StyledCartProductCard = styled.div`
  display: flex;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  margin:20px;
  height:200px;
  img{
    max-width:200px;
    max-height:200px;
  }
  .cardDetails{
    display: flex;
    flex-direction:column;
    padding:10px 20px;
    h4{
      margin:2px;
    },
    h5{
      margin:10px 0px;
    }
  }
`;

const CartProductCard = ({product}) => {
  return (
    <StyledCartProductCard>
        <img src={product.featureImg} alt={product.name} />
        <div className="cardDetails">
          <h4>{product.name}</h4>
          <h4>$ {product.price}</h4>
          <h5>Size: {product.selectedSize}</h5>
          <AddSubtractCart product={product}/>
        </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard
