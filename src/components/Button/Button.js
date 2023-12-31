import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-variant: small-caps;
  align-items: center;
  background-color: #ce9124;
  color: white;
  border: none;
  padding: 5px 10px 5px 10px;
  margin: 3px;
`;

const Button = ({ type = "button", onClick = null, text }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
