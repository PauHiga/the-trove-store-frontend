import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButtonLink = styled.div`
  font-variant: small-caps;
  align-items: center;
  background-color: #ce9124;
  color: white;
  border: none;
  padding: 5px 10px 5px 10px;
  margin:3px;
`;

const ButtonLink = ({url, text}) => {
  return (
    <StyledButtonLink>
      <Link to={url}>{text}</Link>
    </StyledButtonLink>
  )
}

export default ButtonLink