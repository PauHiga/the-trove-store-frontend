import React from 'react'
import styled from 'styled-components';
import heroImage from './images/hero.png';

const StyledHero = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  height:300px;
  width:100%;
  background-color: beige;
`;

const Title = () => {
  return (
      <StyledHero>
      </StyledHero>
  )
}

export default Title