import styled from "styled-components";
import productsService from "../../../services/productsService";
import categoryService from "../../../services/categoryService";
import userService from "../../../services/userService";
import { useSelector } from "react-redux";
import SectionHeader from "../../sectionHeader/SectionHeader";
import AdminCategories from "./UserSectionComponents/AdminCategories";
import AdminProducts from "./UserSectionComponents/AdminProducts";
import AdminOrders from "./UserSectionComponents/AdminOrders";
import UserInfo from "./UserSectionComponents/UserInfo";

const UserSectionContainer = styled.div`
  @media (max-width: 480px) {
    margin-left: 5px;
  }

  display: flex;
  flex-direction: column;
  font-variant: small-caps;
  color: #ce9124;
  margin: 30px;
  .displayAllProducts {
    display: flex;
    flex-wrap: wrap;
  }
  `;
  
  const UserSection = (id) => {

    const user = useSelector(state => state.user)
    productsService.setToken(user.token)
    categoryService.setToken(user.token)
    userService.setToken(user.token)

  return (
    <>
      <SectionHeader text={"Welcome " + user.username} logout="0" />
      <UserSectionContainer>
        {user.role !== 0 ? (
          <>
            <AdminOrders />
            <AdminCategories />
            <AdminProducts />
          </>
        ) : (
          <UserInfo />
        )}
      </UserSectionContainer>
    </>
  );
};

export default UserSection;
