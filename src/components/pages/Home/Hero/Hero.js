import React from "react";
import styled from "styled-components";
import heroImage from "./images/hero.png";

const StyledHero = styled.div`
  background-image: url(${heroImage});
  background-position: center;
  height: 300px;
  width: 100vw;
  background-color: #eae9e4;
  background-size: 1100px 366px;
  background-repeat: no-repeat;
`;

const Title = () => {
  return <StyledHero id="hero-banner"></StyledHero>;
};

export default Title;
