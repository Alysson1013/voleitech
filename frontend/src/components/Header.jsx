import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import icon from "../Assets/icon.png"


const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/dashboard" aria-label="Dogs - Home">
          <img src={icon} alt="Uma bola devolei estilizada" className={styles.icon} />
        </Link>
          <Link className={styles.login} style={{ textDecoration: 'none' }} to="/login">
            Login / Criar
          </Link>
      </nav>
    </header>
  );
};

export default Header;