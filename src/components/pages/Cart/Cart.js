import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SectionHeader from '../../sectionHeader/SectionHeader';
import ButtonLink from '../../ButtonLink/ButtonLink'
import Button from '../../Button/Button';
import CartProductCard from './CartComponents/CartProductCard';
import EmptyCart from './CartComponents/EmptyCart';

const CartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height:55vh;
  max-width: 1100px;
  justify-content: space-around;
  font-variant: small-caps;
  color: #ce9124;
  padding:20px;
  .productsList{
    display:flex;
    flex-direction: column;
  }
  .totalCart{
    display: flex;
    flex-direction: column;
    padding-top:40px;
    width:200px;
    font-size:20px;
    .emptyCart{
      display:flex;
      margin-top:20px;
      font-size:15px;
    }
  }
`;

const Cart = () => {
  const currentCart = useSelector(state => state.cart)
  console.log("currentCart", currentCart)

  if(currentCart.length === 0){
    return(
      <>
        <SectionHeader text="Cart"/>
        <EmptyCart/>
      </>
    )
  }

  const total = currentCart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
    <SectionHeader text="Cart"/>
    <CartContainer>
      <div className="productsList">
        {currentCart.map(item => <CartProductCard key={`${item.id}${item.selectedSize}`} product={item}/>)}
      </div>
      <div className="totalCart">
        Total Cart: $ {total}
        <Button text='Checkout'/>
        <div className="emptyCart">
          <Button text='Empty Cart'/>
        </div>
      </div>
    </CartContainer>
    </>
  );
};

export default Cart
