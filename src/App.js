import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializeProducts } from './reducers/productsReducer'
import { initializeCategories } from './reducers/categoriesReducer'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import AddProducts from './pages/AddProducts/AddProducts';
import EditProducts from './pages/EditProducts/EditProducts';
import NotFound from './pages/NotFound/NotFound'
import AdminSection from './pages/AdminSection/AdminSection';
import ProductPage from './pages/ProductPage/ProductPage'
import Cart from './pages/Cart/Cart'
import { setUser } from './reducers/userReducer';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
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

  
  return (
    <Router>
      <Header/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<About/>} path="/about"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<AdminSection/>} path="/admin-section"/>
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
