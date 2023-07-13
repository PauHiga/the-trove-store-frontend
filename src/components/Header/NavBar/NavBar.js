import React from 'react'
import { Badge } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import iconSearch from './icons/iconSearch.svg'
import iconLogin from './icons/iconLogin.svg'
import iconFav from './icons/iconFav.svg'
import iconCart from './icons/iconCart.svg'


const StyledNavBar = styled.nav`
  font-variant: small-caps;
  display: flex;
  justify-content: flex-end;
  height: 50px;
  flex-direction: column;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin:0px;
    padding:0px;
    li {
      height:40px;
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

  @media (max-width: 480px) { /* Apply styles for mobile devices */
  .navbar-label {
    display: none
  }
`;

const NavBar = () => {
  const user = useSelector(state => state.user)
  const currentCart = useSelector(state => state.cart)
  const amountItemsInCart = currentCart.reduce((sum, item)=> sum + item.amount, 0)
  return (
      <StyledNavBar>
        <div>
          <ul>
            <li>
              {user ? 
              <Link to="/user-section"><img src={iconLogin} alt="icon search" /><span className='navbar-label'>{user.username} logged in</span></Link>           
              : <Link to="/login"><img src={iconLogin} alt="icon search" /><span className='navbar-label'>Login</span></Link>           
              }
            </li>
            <li>
              <Badge count={amountItemsInCart} color='#ce9124' offset={[-10,0]}>
              <Link to="/cart"><img src={iconCart} alt="icon search" /><span className='navbar-label'>Cart</span></Link>           
            </Badge>
            </li>
          </ul>
        </div>
      </StyledNavBar>
  )
}

export default NavBar