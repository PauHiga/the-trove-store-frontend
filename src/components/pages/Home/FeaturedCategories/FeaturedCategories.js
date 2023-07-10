import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import cat1 from '../../../../images/cat1.png'
import cat2 from '../../../../images/cat2.png'
import cat3 from '../../../../images/cat3.png'
import banner from '../../../../images/banner.png'

const StyledFeaturedCategories = styled.nav`
  font-variant: small-caps;
  display: flex;
  justify-content: space-between;

  img {
    width: 310px;
    height: 440px;
    margin: 5px;
  }

  .banner{
    height: 200px;
    width: 960px;
  }
`;

const FeaturedCategories = () => {
  return (
      <StyledFeaturedCategories>
        <div>
          <div>
              <Link to="/category/women"><img src={cat1} alt="category women" /></Link>
              <Link to="/category/girls"><img src={cat1} alt="category girls" /></Link>          
              <Link to="/category/accessories"><img src={cat3} alt="category accessories" /></Link>           
          </div>
          <Link to="/category/on-sale"><img className='banner' src={banner} alt="category discounts" /></Link>           
        </div>
      </StyledFeaturedCategories>
  )
}

export default FeaturedCategories