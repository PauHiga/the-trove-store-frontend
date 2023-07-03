import React from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';

const StyledSectionHeader = styled.div`
  display:flex;
  font-variant: small-caps;
  align-items: center;
  background-color: #eae9e4;
  h1 {
    color: #ce9124;
    font-size:30px;
    margin:0px;
  }
  width 100%;
  height: 80px;
  padding-left: 5vw;
  button {
    margin-left: 15px;
  }
`;

const SectionHeader = ({text, logout=1}) => {

  const handleLogout = () => {
    
  }

  return (
    <StyledSectionHeader>
      <h1>{text}</h1>
      {logout ===0 ? <Button onClick={()=> handleLogout} text="Logout"/> : ""}
    </StyledSectionHeader>
  )
}

export default SectionHeader