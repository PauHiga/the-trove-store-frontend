import React from 'react'
import Hero from './Hero/Hero'
import ServicesBar from '../../components/ServicesBar/ServicesBar'
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';
import ProductsGallery from '../../components/ProductsGallery/ProductsGallery';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .bar {
    width:80%;
    padding: 1px;
    border-bottom: 1px solid #ce9124;
  }
  font-variant: small-caps;
  color: #ce9124;
`;

const Home = () => {
  const allProducts = useSelector(state => state.products)
  return (
    <StyledHome>
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