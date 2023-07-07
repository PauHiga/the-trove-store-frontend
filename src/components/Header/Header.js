import React from 'react'
import styled from 'styled-components';
import NavBar from './NavBar/NavBar'
import Title from './Title/Title';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  width: 100%;
  height:50px;
  // padding-top:5px;
  background-color: white;
`;

const Top = styled.header`
  width: 100%;
  height: 50px;
`;

const Header = () => {
  return (
    <Top>
      <StyledHeader>
        <Title/>
        <NavBar/>
      </StyledHeader>
    </Top>
  )
}

export default Header