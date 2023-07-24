import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import cat1 from "../../../../images/cat1.jpg";
import cat2 from "../../../../images/cat2.jpg";
import cat3 from "../../../../images/cat3.jpg";
import banner from "../../../../images/banner.png";
import banner2 from "../../../../images/banner2.jpg";

const StyledFeaturedCategories = styled.nav`
  font-variant: small-caps;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;

  img {
    width: 310px;
    height: 440px;
  }

  .cat-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .image-container {
    position: relative;
    display: inline-block;
    margin: 5px 5px 10px 5px;
  }

  .image-container-banner2 {
    display: none;
  }
  
  .text-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Background color with 50% opacity */
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-container:hover .text-overlay {
    opacity: 1;
  }  
  
  .text {
    display: inline-block;
    padding: 10px 5px 10px 5px;
    color: #fff;
    font-size: 33px;
  }

  .banner{
    height: 200px;
    width: 960px;
  }

  .banner2{
    display: none;
  }  

  @media (max-width: 950px) { 

  img {
    width: 220px;
    height: auto;
  }

  .banner{
    width: 680px;
    height: auto;
  }

  @media (max-width: 689px) { 
  display: flex;
  flex-wrap: wrap;

  .cat-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .image-container-banner2 {
    position: relative;
    display: inline-block;
    margin: 5px 5px 10px 5px;
  }

  img {
    width: 220px;
    height: auto;
  }

  .banner{
    display: none;
  }  

  .banner2{
    display: inline;
  }  

  .text-overlay {
    opacity: 1;
  }

  .text {
    font-size: 23px;
    padding: 7px 3px 7px 3px;
  }

  @media (max-width: 480px) { 
  display: flex;
  flex-direction: column;

  img {
    width: 310px;
    height: 440px;
  }

`;

const FeaturedCategories = () => {
  return (
    <StyledFeaturedCategories>
      <div className='cat-container'>
        <div className='image-container'>
          <Link to='/category/women'><img src={cat1} alt='category women' /></Link>
          <div className='text-overlay'>
            <span className='text'>Shop Woman</span>
          </div>
        </div>
        <div className='image-container'>
          <Link to='/category/girls'><img src={cat2} alt='category girls' /></Link>
          <div className='text-overlay'>
            <span className='text'>Shop Little Woman</span>
          </div>
        </div>
        <div className='image-container'>
          <Link to='/category/accessories'><img src={cat3} alt='category accessories' /></Link>
          <div className='text-overlay'>
            <span className='text'>Shop Accessories</span>
          </div>
        </div>        
        <div className='image-container-banner2'>
          <Link to='/category/on-sale'><img className='banner2' src={banner2} alt='category discounts' /></Link>
        </div>
      </div>
      <Link to='/category/on-sale'><img className='banner' src={banner} alt='category discounts' /></Link>
    </StyledFeaturedCategories>
  );
};

export default FeaturedCategories;
