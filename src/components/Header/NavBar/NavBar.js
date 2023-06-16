import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import iconSearch from './icons/iconSearch.svg'
import iconLogin from './icons/iconLogin.svg'
import iconFav from './icons/iconFav.svg'
import iconCart from './icons/iconCart.svg'

const StyledNavBar = styled.nav`
  font-variant: small-caps;
  display: flex;
  justify-content: space-between;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    
    li {
      
      a {
        display: flex;
        align-items: center;
        margin-right: 10px;
        height: 30px;
        text-decoration: none;
        padding: 5px;

        &:hover {
          text-decoration: underline;
        }

        img {
          width: 30px;
          height: 30px;
          margin: 5px;
        }
      }
    }
  }
`;

const NavBar = () => {
  return (
      <StyledNavBar>
        <ul>
          <li>
            <Link to="/search"><img src={iconSearch} alt="icon search" />Search</Link>
          </li>
          <li>
            <Link to="/fav"><img src={iconFav} alt="icon search" />Favorites</Link>          
          </li>
          <li>
            <Link to="/login"><img src={iconLogin} alt="icon search" />Login</Link>           
          </li>
          <li>
            <Link to="/cart"><img src={iconCart} alt="icon search" />Cart</Link>           
          </li>
        </ul>
      </StyledNavBar>
  )
}

export default NavBar