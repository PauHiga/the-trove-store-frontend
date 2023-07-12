import React from 'react'
import styled from 'styled-components';
import iconShipm from './icons/iconShipm.svg'
import iconDisc from './icons/iconDisc.svg'
import iconSurp from './icons/iconSurp.svg'
import iconPay from './icons/iconPay.svg'
import icon24 from './icons/icon24.svg'

const StyledServicesBar = styled.div`
  font-variant: small-caps;
  width:80%;
  max-width: 1400px;
  padding: 30px 0px 30px 0px;
  display: flex;
  justify-content: space-evenly;
  color: black;

  img {
    width: 40px;
    height: 40px;
    margin: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 5px;
  }

  @media (max-width: 480px) { /* Apply styles for mobile devices */
  flex-wrap: wrap;

  div {
    flex-basis: calc(50% - 10px);
  }  
`;

const ServicesBar = () => {
  return (
    <StyledServicesBar>
      <div><img src={iconShipm} alt="Free Shipping icon" />Free Shipping</div>
      <div><img src={iconDisc} alt="Special Discount icon" />Special Discount</div>
      <div><img src={iconSurp} alt="Surprise Offers icon" />Surprise Offers</div>
      <div><img src={iconPay} alt="Secure Payment icon" />Secure Payment</div>
      <div><img src={icon24} alt="24/7 support icon" />24/7 Support</div>
    </StyledServicesBar>
  )
}

export default ServicesBar