import React from 'react';
import { useHistory } from 'react-router-dom';
import { signInUser, getUser } from './Hooks/Api.jsx'
import jwt_decode from "jwt-decode";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      history.push('/login');
    },
    [history],
  );

  const getToken = () => {
    const token = window.localStorage.getItem('token')
    if (token) return token
    else return;
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const tokenRes = await signInUser({ email, password });
      if (!tokenRes) throw new Error(`Error: ${tokenRes.statusText}`);
      const token = tokenRes.login.token
      window.localStorage.setItem('token', token);
      const tokenDecode = jwt_decode(token)
      let userData = await getUser(tokenDecode.id, token)
      setData(userData)
      history.push('/dashboard');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogout, data, error, loading, login, userLogin, getToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
