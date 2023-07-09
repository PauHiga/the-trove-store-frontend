import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
import styled from 'styled-components';
import Button from '../Button/Button';

const StyledSectionHeader = styled.div`
  display:flex;
  font-variant: small-caps;
  align-items: center;
  background-color: #eae9e4;
  justify-content: space-around;
  h1 {
    color: #ce9124;
    font-size:30px;
    margin:0px;
  }
  width 100%;
  height: 80px;
  button {
    margin-left: 15px;
  }
`;

const SectionHeader = ({text, logout=1}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserTroveStore');
    dispatch(setUser(''))
    navigate('/');
  }

  return (
    <StyledSectionHeader>
      <h1>{text}</h1>
      {logout ==="0" ? <Button onClick={handleLogout} text="Logout"/> : ""}
    </StyledSectionHeader>
  )
}

export default SectionHeader