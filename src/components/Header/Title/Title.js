import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import logo from './images/logo.svg'

const StyledTitle = styled.div`
  font-family: 'Zeyada', cursive;
  display: flex;
  align-items: center;
  a {
  display: flex;
  }
  img {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  h1 {
    margin: 0;
    padding: 0;
  }
`;

const Title = () => {
  return (
      <StyledTitle>
        <Link to="/"><img src={logo} alt="icon search" /><h1>The Trove Store</h1></Link>
      </StyledTitle>
  )
}

export default Title