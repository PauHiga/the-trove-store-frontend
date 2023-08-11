import React from "react";
import styled from "styled-components";

const StyledNotFound = styled.div`
  height: 70vh;
  color: #ce9124;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFound = () => {
  return (
    <StyledNotFound>
      <h2>404 not found</h2>
      <p>This content doesn't exist!</p>
    </StyledNotFound>
  );
};

export default NotFound;
