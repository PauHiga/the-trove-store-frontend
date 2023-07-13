import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getUserInfo, updateUser } from '../../../../reducers/userReducer';
import userService from '../../../../services/userService';
import ScrollToTop from '../../../ScrollToTop/ScrollToTop';
import DisplayUserInfo from './DisplayUserInfo';
import Button from '../../../Button/Button';

const StyledUserInfo = styled.div`

  .center {
    display:flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px 0px 10px 0px;
  }

  min-height: 55vh;
  label {
    margin-right:20px;
  }
  p {
    margin: 0px;
  }
  .inline{
    display:flex;
    margin: 10px 0px;
    align-items: center;
  }

  `;
  
  const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin:20px;
  .form-entry{
    display: flex;
    align-items: center;
    margin-bottom: 1vh;
    max-width:100vw;
  }
  label{
    width:20vw;
    margin-top:10px;
  }
  input{
    width:60vw;
    margin-top:10px;
  }
`;

  const UserInfo = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()
    
    const decrypt = (string) => {
      const bytes = CryptoJS.AES.decrypt(string,'TroveStore')
      return bytes.toString(CryptoJS.enc.Utf8)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const localUser = window.localStorage.getItem("loggedUserTroveStore");
          if (localUser) {
            const parseUser = JSON.parse(localUser);
            userService.setToken(parseUser.token);
            const data = await dispatch(getUserInfo());
            setName(decrypt(data.name))
            setEmail(decrypt(data.email))
            setAddress(decrypt(data.address))
            setPhone(decrypt(data.phone))
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [dispatch]);
        
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name || !email || !address || !phone){
        setErrorMessage("Please complete all the fields")
        setTimeout(()=>setErrorMessage(""), 3000)
      }
      else{
        try {
          const nameC = CryptoJS.AES.encrypt(name, 'TroveStore').toString();
          const emailC = CryptoJS.AES.encrypt(email, 'TroveStore').toString();
          const phoneC = CryptoJS.AES.encrypt(phone, 'TroveStore').toString();
          const addressC = CryptoJS.AES.encrypt(address, 'TroveStore').toString();
          
          const userToUpdate = {
            name: nameC,
            email: emailC,
            phone: phoneC,
            address: addressC,
          };
    
          const updatedUser = await userService.editUser(userToUpdate);
          console.log("updatedUser", updatedUser);
          dispatch(updateUser(updatedUser.data))
  
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <StyledUserInfo>
          <div className="center">
              <ScrollToTop/>
              <h2>User Information</h2>
              <DisplayUserInfo name={name} address={address} phone={phone} email={email}/>
              <div className="toggle-edit-user" data-bs-toggle="collapse" data-bs-target="#collapse-add-category" aria-controls="collapse-add-category">
                  <Button onClick={null} text={"Edit User"}/>
              </div>
          </div>
          <div className="collapse" id="collapse-add-category">
            <RegisterForm>
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
              {errorMessage}
              <Button onClick={handleSubmit} text={"Save changes"}/>
            </RegisterForm>
          </div>
        </StyledUserInfo>
      </>
    );
  };


export default UserInfo
