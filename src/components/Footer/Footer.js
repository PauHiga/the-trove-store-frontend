import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain } from '@fortawesome/free-solid-svg-icons'

const StyledFooter = styled.footer`
  .footer-content {
    background-color: #ce9124;
    padding: 70px 0px 70px 0px;
    width: 100%;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-variant: small-caps;
  }

  div {
    height:100%;
  }

  .footer-text{
    display: flex;
  }

  .footer-info{
    border-right: 1px solid black;
    padding-right: 50px;
  }

  .footer-links {
    margin: 0px 80px 0px 0px;
    padding-left: 50px;
    display: flex;
    font-size: 20px;
  }

  .footer-links div + div {
    margin-left: 20px;
  }

  .media{
    display: flex;
    flex-direction: column;
    margin-top: auto;
  }

  .media div {
    display: flex;
    align-items: flex-end;    
  }

  h4 {
    margin:0px 0px 30px 0px;
    font-variant: small-caps;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .footer-info li {
    font-size: 14px;
    margin-top: 8px;
  }  

  li + li {
    margin-top: 15px;
  }

  a {
    padding-right:20px;
  }

  @media (max-width: 820px) { /* Apply styles for mobile devices */
  .footer-content {
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    padding: 50px 30px 40px 30px;
  }

  .footer-info {
    order: 1;
    border-right: 0px;
    padding-right: 0px;
    margin-bottom: 20px;
  }
  
  .footer-links {
    order: 3;
  }
  
  .media {
    order: 2;
    margin: 0px 0px 40px 0px;
  }  

  .footer-links {
    margin: 0px 0px 0px 0px;
    padding-left: 0px;
    display: flex;
    font-size: 20px;
  }

  @media (max-width: 480px) { /* Apply styles for mobile devices */

  .footer-links {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    // border-top: 1px solid black;
  }

  .media {
    margin: 0px 0px 25px 0px;
  }  

  .footer-links div {
    display: inline;
  }  

  .footer-links div + div {
    margin: 0px;
    padding: 0px;
  }  

  .footer-links div ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }  
  
  li {
    margin-top: 15px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className='footer-content'>
        <div className='footer-info'>
          <h4>The Trove Store</h4>
          <ul>
            <li>Av. Avenue 1234</li>
            <li>(154) 69-3567-2781</li>
            <li>contact@thetrovestore.com</li>
          </ul>
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
        <div className='media'>
          <div>
            <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
            <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
            <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
            <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faChain} /></a>
          </div>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer