import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import icon from "../Assets/icon.png";
import { UserContext } from '../UserContext';


const Header = () => {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/dashboard" aria-label="Dogs - Home">
          <img src={icon} alt="Uma bola de volei estilizada" className={styles.icon} />
        </Link>
          {token ? (
            <Link className={styles.login}>
              Conta
            </Link>
            ) : (
            <Link className={styles.login} to="/login">
              Login / Criar
            </Link>
          )}
      </nav>
    </header>
  );
};

export default Header;