import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import 'animate.css';
import Login from './components/Login/Login';
import BackgroundSlider from 'react-background-slider'
import image2 from './Assets/imagem2.jpg'
import image3 from './Assets/imagem3.jpg'

function App() {
  return (
    <div className="App">
      <BackgroundSlider
        images={[image2, image3]}
        duration={100} transition={2} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
