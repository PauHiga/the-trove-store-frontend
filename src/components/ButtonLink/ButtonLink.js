import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const ButtonLink = ({ url, text }) => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate(url);
  };

  return <Button text={text} onClick={buttonHandler} />;
};

export default ButtonLink;
