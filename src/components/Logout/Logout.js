import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import { emptyCart } from "../../reducers/cartReducer";
import Button from "../Button/Button";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUserTroveStore");
    dispatch(setUser(""));
    dispatch(emptyCart());
    navigate("/");
  };

  return <Button onClick={handleLogout} text="Logout" />;
};

export default Logout;
