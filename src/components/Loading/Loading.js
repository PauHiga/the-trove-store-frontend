import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  width: 100vw;
  display: flex;
  height: 70vh;
  color: #ce9124;
  font-variant: small-caps;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <h3>The Trove Store</h3>
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only"></span>
      </div>
    </StyledLoading>
  );
};

export default Loading;
