import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import cat1 from '../../../../images/cat1.jpg'
import cat2 from '../../../../images/cat2.jpg'
import cat3 from '../../../../images/cat3.jpg'
import banner from '../../../../images/banner.png'
import banner2 from '../../../../images/banner2.jpg'

const StyledFeaturedCategories = styled.nav`
  font-variant: small-caps;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;

  img {
    width: 310px;
    height: 440px;
    margin: 5px;
  }

  .banner{
    height: 200px;
    width: 960px;
  }

  .banner2{
    display: none;
  }  

  @media (max-width: 950px) { /* Apply styles for mobile devices */

  img {
    width: 220px;
    height: auto;
    margin: 5px;
  }

  .banner{
    width: 680px;
    height: auto;
  }

  @media (max-width: 680px) { /* Apply styles for mobile devices */
  display: flex;
  flex-wrap: wrap;

  .cat-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  img {
    width: 220px;
    height: auto;
    margin: 5px;
  }

  .banner{
    display: none;
  }  

  .banner2{
    display: inline;
  }  

  @media (max-width: 480px) { /* Apply styles for mobile devices */
  display: flex;
  flex-direction: column;

  img {
    width: 310px;
    height: 440px;
    margin: 5px;
  }
`;

const FeaturedCategories = () => {
  return (
      <StyledFeaturedCategories>
          <div className='cat-container'>
              <Link to="/category/women"><img src={cat1} alt="category women" /></Link>
              <Link to="/category/girls"><img src={cat2} alt="category girls" /></Link>          
              <Link to="/category/accessories"><img src={cat3} alt="category accessories" /></Link>           
              <Link to="/category/on-sale"><img className='banner2' src={banner2} alt="category discounts" /></Link>           
          </div>
          <Link to="/category/on-sale"><img className='banner' src={banner} alt="category discounts" /></Link>           
      </StyledFeaturedCategories>
  )
}

export default FeaturedCategories