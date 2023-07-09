import { useState } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../reducers/userReducer';
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
  margin:20px;
  font-size:17px;
  input {
    margin: 5px;
  }
  .form-entry{
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  label{
    width:100px;
  }
  input{
    width:250px;
  }
`;

  const UserInfo = () => {

    const user = useSelector(state => state.user)

    const decrypt = (string) => {
      const bytes = CryptoJS.AES.decrypt(string,'TroveStore')
      return bytes.toString(CryptoJS.enc.Utf8)
    }
    
    const [name, setName] = useState(decrypt(user.name))
    const [email, setEmail] = useState(decrypt(user.email))
    const [address, setAddress] = useState(decrypt(user.address))
    const [phone, setPhone] = useState(decrypt(user.phone))
    const [errorMessage, setErrorMessage] = useState(decrypt(''))
  
    const dispatch = useDispatch()
  
  
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
          dispatch(setUser(updatedUser.data))
  
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    return (
      <>
        <StyledUserInfo>
          <div className="center">

              <ScrollToTop/>
              <h2>User Information</h2>
              <DisplayUserInfo name={name} address={address} phone={phone} email={email}/>
              <div className="toggle-edit-user" data-bs-toggle="collapse" data-bs-target="#collapse-add-category" aria-controls="collapse-add-category">
                  <Button onClick={null} text={"Edit changes"}/>
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
                  type="text"
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
                  type="text"
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
