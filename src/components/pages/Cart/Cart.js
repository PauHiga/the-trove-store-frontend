import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderService from '../../../services/orderService';
import SectionHeader from '../../sectionHeader/SectionHeader';
import CartProductCard from './CartComponents/CartProductCard';
import EmptyCart from './CartComponents/EmptyCart';
import Button from '../../Button/Button';
import ButtonLink from '../../ButtonLink/ButtonLink'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
    align-items: center;
    padding-top:40px;
    width:200px;
  }

  @media (max-width: 480px) { 
    .totalCart{
      padding-top:5px;
    }
  }
`;

const Cart = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  orderService.setToken(user.token)


  const currentCart = useSelector(state => state.cart)

  if(currentCart.length === 0){
    return(
      <>
        <SectionHeader text="Cart"/>
        <EmptyCart/>
      </>
    )
  }

  const total = currentCart.reduce((sum, item) => sum + item.price-(item.price*item.discount/100), 0)

  const loginHandler = () => {
    navigate('/login')
  }

  const orderHandler = async () => {
    const products = currentCart.map((item)=> {
      return `${item.name} - ${item.selectedSize}`
    })


    const order = {
      products: products,
      completed: false
    }
    await orderService.createOrder(order)
  }

  return (
    <>
    <SectionHeader text="Cart"/>
    <CartContainer>
      <div className="totalCart">
      {user? 
          <>
          <h3>Total Cart: $ {total}</h3>
          {user.role !== 1 ?
          <PayPalScriptProvider options={{ clientId: "test" }}>
              <PayPalButtons
                  createOrder={(data, actions) => {
                      return actions.order.create({
                          purchase_units: [
                              {
                                  amount: {
                                      value: total,
                                  },
                              },
                          ],
                      });
                  }}
                  onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                          const name = details.payer.name.given_name;
                          alert(`Transaction completed by ${name}`);
                      }).then(orderHandler);
                  }}
              />
          </PayPalScriptProvider>
          : 'Admin user cannot create an order checkout. Create a user account.'}
          </>
        :<Button onClick={loginHandler} text="Login to checkout"/>}
      </div>
      <div className="productsList">
        {currentCart.map(item => <CartProductCard key={`${item.id}${item.selectedSize}`} product={item}/>)}
      <ButtonLink url="/category/all-products" text="Go Shopping"/>
      </div>
    </CartContainer>
    </>
  );
};

export default Cart
