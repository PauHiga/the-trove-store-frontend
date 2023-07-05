import React from 'react'
import styled from 'styled-components';

const StyledDisplayUserInfo = styled.div`
padding:20px;
.line{
  display:flex;
  font-size:20px;
}
.userInfoKey{
  width:20%;
}
.userInfoValue{
  width:70%;
}
`;

const DisplayUserInfo = ({name, address, phone, email}) => {


  return (
    <StyledDisplayUserInfo>
      <div className="line">
        <div className="userInfoKey">Name</div>
        <div className="userInfoValue">{name}</div>
      </div>
      <div className="line">
        <div className="userInfoKey">E-mail</div>
        <div className="userInfoValue">{email}</div>
      </div>
      <div className="line">
        <div className="userInfoKey">Address</div>
        <div className="userInfoValue">{address}</div>
      </div>
      <div className="line">
        <div className="userInfoKey">Phone</div>
        <div className="userInfoValue">{phone}</div>
      </div>
    </StyledDisplayUserInfo>
  )
}

export default DisplayUserInfo