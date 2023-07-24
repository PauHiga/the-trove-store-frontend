import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializeProducts } from './reducers/productsReducer'
import { initializeCategories } from './reducers/categoriesReducer'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import AddProducts from './components/pages/AddProducts/AddProducts';
import EditProducts from './components/pages/EditProducts/EditProducts';
import NotFound from './components/pages/NotFound/NotFound'
import Sections from './components/pages/Sections/Sections'
import UserSection from './components/pages/UserSection/UserSection';
import ProductPage from './components/pages/ProductPage/ProductPage'
import Cart from './components/pages/Cart/Cart'
import { setUser } from './reducers/userReducer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Register from './components/pages/Register/Register';
import Loading from './components/Loading/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(initializeProducts());
        await dispatch(initializeCategories());
        const localUser = window.localStorage.getItem("loggedUserTroveStore");
        if (localUser) {
          const parseUser = JSON.parse(localUser);
          dispatch(setUser(parseUser))
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  
  if (isLoading) {
    return <Loading/>;
  }
  
  return (
    <Router>
      <ScrollToTop />
      <Header/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>
          <Route element={<UserSection/>} path="/user-section"/>
          <Route element={<AddProducts/>} path="/add-products"/>
          <Route element={<Sections/>} path="/category/:section"/>
          <Route element={<EditProducts/>} path="/edit-products/:id"/>
          <Route element={<ProductPage/>} path="/products/:id"/>
          <Route element={<Cart/>} path="/cart"/>
          <Route element={<NotFound />} path="*" />       
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;