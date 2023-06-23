import React, { useState } from 'react';
import styled from 'styled-components';
import loginService from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userReducer';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
      dispatch(setUser(JSON.stringify(user.data)))

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
    <LoginForm onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      {IncorrectCredentials}
      <SubmitButton type="submit">Log In</SubmitButton>
    </LoginForm>
  );
};

export default Login
