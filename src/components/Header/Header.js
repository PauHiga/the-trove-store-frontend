import React from 'react'
import styled from 'styled-components';
import NavBar from './NavBar/NavBar'
import Title from './Title/Title';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  position: sticky;
  top: 0;
  z-index: 1000;
  width = 100vw;
  height:50px;
  background-color: white;

  @media (max-width: 480px) { /* Apply styles for mobile devices */
  width: 100%;

  @media (max-width: 340px) { /* Apply styles for mobile devices */
  justify-content: space-between;
  padding: 0px 0px 0px 15px;
`;

const Header = () => {
  return (
  <>
    <StyledHeader>
      <Title/>
      <NavBar/>
    </StyledHeader>
  </>
  )
}

export default Header