import React from 'react'
import Hero from './Hero/Hero'
import ServicesBar from '../../ServicesBar/ServicesBar'
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';
import ProductsGallery from '../../ProductsGallery/ProductsGallery';
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import ScrollToTop from '../../ScrollToTop/ScrollToTop';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .bar {
    width:80%;
    padding: 1px;
    border-bottom: 1px solid #ce9124;
  }
  h2{
    padding:30px 0px 10px 0px;
  }
  font-variant: small-caps;
  color: #ce9124;
`;

const Home = () => {
  const allProducts = useSelector(state => state.products)
  return (
    <StyledHome>
      <ScrollToTop />
      <Hero/>
      <ServicesBar/>
      <FeaturedCategories/>
      <div className='bar'></div>
      <div className='bar'></div>
      <h2>Our Selection</h2>
      <ProductsGallery products={allProducts}/>
    </StyledHome>
  )
}

export default Home