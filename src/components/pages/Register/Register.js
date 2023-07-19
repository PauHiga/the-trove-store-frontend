import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../reducers/userReducer";
import styled from "styled-components";
import userService from "../../../services/userService";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import SectionHeader from "../../sectionHeader/SectionHeader";
import Button from "../../Button/Button";

const StyledRegister = styled.div`
  display: flex;
  min-height: 65vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-variant: small-caps;
  margin: 20px;
  h2 {
    color: #ce9124;
  }
  button {
    font-variant: small-caps;
    align-items: center;
    background-color: #ce9124;
    color: white;
    border: none;
    padding: 7px 10px 7px 10px;
    margin-left: 30px;
    margin-top: 30px;
    width: 150px;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  .form-entry {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px 0px;
  }
  input {
    width: 250px;
    margin: 1px 0px;
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !name || !email || !address || !phone || !password) {
      setErrorMessage("Please complete all the fields");
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      try {
        const nameC = CryptoJS.AES.encrypt(name, "TroveStore").toString();
        const emailC = CryptoJS.AES.encrypt(email, "TroveStore").toString();
        const phoneC = CryptoJS.AES.encrypt(phone, "TroveStore").toString();
        const addressC = CryptoJS.AES.encrypt(address, "TroveStore").toString();

        const newUser = {
          username: username,
          password: password,
          name: nameC,
          email: emailC,
          phone: phoneC,
          address: addressC,
          role: 0,
        };

        const createdUser = await userService.register(newUser);
        console.log("userCreated", createdUser);
        window.localStorage.setItem(
          "loggedUserTroveStore",
          JSON.stringify(createdUser.data),
        );
        dispatch(setUser(createdUser.data));
        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.response.status) {
          if (error.response.status === 409) {
            setErrorMessage(
              "There is another user with the same username! Please choose a different one",
            );
            setTimeout(() => setErrorMessage(""), 3000);
          }
        }
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <SectionHeader text="Register" />
      <StyledRegister>
        <h2>New User</h2>
        <RegisterForm>
          <div className="form-entry">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage}
          <Button onClick={handleSubmit} text={"Register"} />
        </RegisterForm>
      </StyledRegister>
    </>
  );
};

export default Register;
