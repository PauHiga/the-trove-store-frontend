import styled from 'styled-components';
import productsService from '../../../services/productsService';
import categoryService from '../../../services/categoryService';
import { useSelector } from 'react-redux';

import SectionHeader from '../../sectionHeader/SectionHeader';
import AdminCategories from './UserSectionComponents/AdminCategories';
import AdminProducts from './UserSectionComponents/AdminProducts';

const UserSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-variant: small-caps;
  color: #ce9124;
  margin-left:30px;
  .displayAllProducts {
    display: flex;
    flex-wrap: wrap;
  }
  `;
  
  const UserSection = (id) => {

    const user = useSelector(state => state.user)
    productsService.setToken(user.token)
    categoryService.setToken(user.token)
    

   return (
    <>
      <SectionHeader text={"Welcome Admin"}/>
      <UserSectionContainer>
        <AdminCategories/>
        <AdminProducts/>
      </UserSectionContainer>  
    </>


  );
};

export default UserSection