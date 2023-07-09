import React from 'react'
import styled from 'styled-components';

const StyledDisplayUserInfo = styled.div`
display: grid;
grid-template-columns: auto auto;
justify-content: start;
gap: 10px;
width: max-content;
margin: 0 auto 20px auto;
grid-column-gap: 25px;

.line{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
}
`;

const DisplayUserInfo = ({name, address, phone, email}) => {


  return (
    <StyledDisplayUserInfo>

        <div className="userInfoKey">Name</div>
        <div className="userInfoValue">{name}</div>


        <div className="userInfoKey">E-mail</div>
        <div className="userInfoValue">{email}</div>


        <div className="userInfoKey">Address</div>
        <div className="userInfoValue">{address}</div>


        <div className="userInfoKey">Phone</div>
        <div className="userInfoValue">{phone}</div>

    </StyledDisplayUserInfo>
  )
}

export default DisplayUserInfo