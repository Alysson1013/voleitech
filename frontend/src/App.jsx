import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import 'animate.css';
import './App.scss';
import { UserStorage } from './UserContext';
import Routes from './routes';

function App() {
  return (
    <div className="App area">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes />
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
