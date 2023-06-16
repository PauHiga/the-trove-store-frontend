import React from 'react'
import styled from 'styled-components';
import NavBar from './NavBar/NavBar'
import Title from './Title/Title';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title/>
      <NavBar/>
    </StyledHeader>
  )
}

export default Header