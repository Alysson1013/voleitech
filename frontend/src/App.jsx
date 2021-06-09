import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import 'animate.css';
import Login from './components/Login/Login';
import AnimatedBg from "react-animated-bg";

function App() {
  return (
    <AnimatedBg
      className="Back"
      colors={["AliceBlue", "Ivory", "white"]}
      duration={5}
      delay={1}
      timingFunction="linear"
    >
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </AnimatedBg>
  );
}

export default App;
