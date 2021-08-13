import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import 'animate.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './App.scss';
import { UserStorage } from './UserContext';

function App() {
  return (
    <div className="App area">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <ul className="circles">
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
          <Routes>
            <Route path="/login/*" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
