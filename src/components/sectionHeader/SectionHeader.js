import React from "react";
import styled from "styled-components";
import Logout from "../Logout/Logout";

const StyledSectionHeader = styled.div`
  display:flex;
  font-variant: small-caps;
  align-items: center;
  background-color: #eae9e4;
  justify-content: space-around;
  h1 {
    color: #ce9124;
    margin:0px;
  }
  width 100%;
  height: 80px;
  button {
    margin-left: 15px;
  }
`;

const SectionHeader = ({ text, logout = 1 }) => {
  return (
    <StyledSectionHeader id="section-header">
      <h1>{text}</h1>
      {logout === "0" ? <Logout /> : ""}
    </StyledSectionHeader>
  );
};

export default SectionHeader;
