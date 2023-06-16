import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<About/>} path="/about"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<NotFound />} path="*" />       
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
