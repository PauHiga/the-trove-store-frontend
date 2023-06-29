import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AddSubtractCart from '../../AddSubtractCart/AddSubtractCart';

const CartContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  width: 70%;
  max-width: 1100px;
  justify-content: center;
  font-variant: small-caps;
  color: #ce9124;
  padding:20px;
`;

const ItemInCart = ({product}) => {
  return(
    <div>
      {product.name}
      <AddSubtractCart productId={product.id}/>
    </div>
  )
}

const Cart = (id) => {
  const currentCart = useSelector(state => state.cart)
  return (
    <CartContainer>
      <h2>Cart</h2>
      <div>
        {currentCart.length === 0 ? 'The cart is empty!' : ''}
      <ul>
        {currentCart.map(item => <ItemInCart key={item.id} product={item}/>)}
      </ul>
      </div>
    </CartContainer>
  );
};

export default Cart
