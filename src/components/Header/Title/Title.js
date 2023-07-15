import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import logo from './images/logo.svg'

const StyledTitle = styled.div`
  font-family: 'Zeyada', cursive;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 3px 0px 0px 0px;

  a {
  display: flex;
  }

  img {
    width: 30px;
    height: 30px;
    margin: 4px 10px 0px 0px;
  }
  
  #main-title {
    margin: 0;
    padding: 5px 0px 0px 0px;
  }


  @media (max-width: 480px) { 
  #main-title {
    font-size: 30px;
  }

  @media (max-width: 340px) { 
  #main-title {
    display: none
  }

  img {
    margin: 0px 10px 0px 0px;
  }  

`;

const Title = () => {
  return (
    <StyledTitle>
      <Link to="/"><img src={logo} alt="icon search" />
        <h1 id='main-title'>The Trove Store</h1></Link>
    </StyledTitle>
  )
}

export default Title