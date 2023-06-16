import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain } from '@fortawesome/free-solid-svg-icons'

const StyledFooter = styled.footer`
  background-color: #ce9124;
  padding:3% 0% 3% 0%;
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  div {
    height:100%;
  }

  .footer-content{
    display: flex;
  }

  .footer-info{
    width: 200px;
    height:100px;
    margin-top: 10px;
    border-right: 1px solid black;
  }

  .footer-links {
    margin-top: 10px;
    display: flex;
  }

  .media{
    display: flex;
    flex-direction: column;
  }

  .media div {
    display: flex;
    align-items: flex-end;    
  }

  h4 {
    margin:0;
    font-variant: small-caps;
  }

  ul {
    margin:0;
  }
  p {
    font-size: 12px;
  }

  li{
    margin-bottom: 10px;
  }

  a {
    padding-right:20px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className='footer-content'>
        <div className='footer-info'>
          <h4>The Trove Store</h4>
          <p>Av. Avenue 1234</p>
          <p>(154) 69-3567-2781</p>
          <p>contact@thetrovestore.com</p>
        </div>
        <div className='footer-links'>
          <div>
            <ul>
              <li><Link to='/about'>About Us</Link></li>
              <li><Link to='/'>Collection</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
              <li><Link to='/shop-policies'>Shop Policies</Link></li>
            </ul>
          </div>
          <div>        
            <ul>
              <li><Link to='/FAQ'>FAQ</Link></li>
              <li><Link to='/legals'>Legals</Link></li>
              <li><Link to='/privacy-policies'>Privacy Policies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='media'>
        <div>
          <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
          <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
          <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
          <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer