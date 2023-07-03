import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeProducts } from './reducers/productsReducer'
import { initializeCategories } from './reducers/categoriesReducer'
import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Login from './components/pages/Login/Login';
import AddProducts from './components/pages/AddProducts/AddProducts';
import EditProducts from './components/pages/EditProducts/EditProducts';
import NotFound from './components/pages/NotFound/NotFound'
import UserSection from './components/pages/UserSection/UserSection';
import ProductPage from './components/pages/ProductPage/ProductPage'
import Cart from './components/pages/Cart/Cart'
import { setUser } from './reducers/userReducer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log("inuseEffect")
    dispatch(initializeProducts())
    dispatch(initializeCategories())
  }, [dispatch])

  useEffect(() => {
    const localUser = window.localStorage.getItem("loggedUserTroveStore");
    if (localUser) {
      const parseUser = JSON.parse(localUser);
      dispatch(setUser(parseUser))
    }
  }, [dispatch]);

  let productsState = useSelector(state => state.products)
  console.log(productsState)

  return (
    <Router>
      <ScrollToTop />
      <Header/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<About/>} path="/about"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<UserSection/>} path="/user-section"/>
          <Route element={<AddProducts/>} path="/add-products"/>
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
