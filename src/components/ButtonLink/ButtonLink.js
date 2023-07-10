import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const ButtonLink = ({url, text}) => {

  console.log(url)

  const navigate = useNavigate()

  const buttonHandler = () => {
    navigate('/register')
  }

  return (
    <Button text={text} onClick={buttonHandler}/>
  )
}

export default ButtonLink