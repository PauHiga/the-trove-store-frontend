import React from 'react'
import styled from 'styled-components';
import heroImage from '../../../../images/hero-banner-05.jpg';
import heroImageM from '../../../../images/hero-banner-06.jpg';

const StyledHero = styled.div`
  .mobile {
    display: none;
    width: 100vw;
    height: auto;
  }
  .wide {
    display: inline;
    max-width: 100%;
    height: auto;  
  }
  @media (max-width: 480px) {   
    .wide {
      display: none;
    }
    .mobile {
      display: inline;
    }
  }
`;

const Title = () => {
  return (
    <StyledHero>
      <img className='wide' src={heroImage} alt="Photo by Mark Mook from Pixabay"></img>
      <img className='mobile' src={heroImageM} alt="Photo by Mark Mook from Pixabay"></img>
    </StyledHero>
  )
}
