import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<About/>} path="/about"/>       
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
