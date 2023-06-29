import React from 'react'
import styled from 'styled-components';

const StyledSectionHeader = styled.div`
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
  padding:20px 0px 0px 20px;  
  margin-bottom:10px;
`;

const SectionHeader = ({text}) => {
  return (
    <StyledSectionHeader>
      <h1>{text}</h1>
    </StyledSectionHeader>
  )
}

export default SectionHeader