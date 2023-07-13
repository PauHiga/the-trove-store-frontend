import React, { useState } from 'react';
import styled from 'styled-components';
import loginService from '../../../services/loginService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../reducers/userReducer';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import SectionHeader from '../../sectionHeader/SectionHeader';
import ButtonLink from '../../ButtonLink/ButtonLink';
import Button from '../../Button/Button';

const ContainerLoginForm = styled.div`
  min-height:60vh;
  font-variant: small-caps;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding:40px; 
  }
  .formGroup{
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom:20px;
  }
  button {
    padding: 7px 10px 7px 10px;
    width:150px;
  }
`;

const Register = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 300px;
  padding-bottom:40px;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [IncorrectCredentials, setIncorrectCredentials] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername('');
      setPassword('');
      window.localStorage.setItem(
        'loggedUserTroveStore', JSON.stringify(user.data)
      ) 
      dispatch(setUser(user.data))

      navigate('/');
      setTimeout(() => {
        setIncorrectCredentials('');
      }, 4000);
    } catch (error) {
      console.log(error);
      setIncorrectCredentials('Incorrect username or password');
      setTimeout(() => {
        setIncorrectCredentials('');
      }, 4000);
    }
  };

  return (
    <>
      <ScrollToTop/>
      <SectionHeader text="Login"/>
      <ContainerLoginForm>
        <form>
          <div className="formGroup">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          {IncorrectCredentials}
          <Button onClick={handleSubmit} text={"Log In"}/>
        </form>
        <Register>
          <p>Register a new account: </p>
          <ButtonLink url='/register' text='Register'/>
        </Register>
      </ContainerLoginForm>
    </>
  );
};

export default Login
