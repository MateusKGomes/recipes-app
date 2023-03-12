import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/RecipesContext';

function Login() {
  const { login, setLogin } = useContext(context);
  const history = useHistory();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const minpass = 6;
  const validation = login.password.length > minpass && emailRegex.test(login.email);

  const handleLogin = ({ target }) => {
    const { value, name } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handlClick = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
    setLogin({ email: '', password: '' });
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        value={ login.email }
        name="email"
        onChange={ handleLogin }
      />
      <br />
      <input
        data-testid="password-input"
        type="password"
        value={ login.password }
        name="password"
        onChange={ handleLogin }
      />
      <br />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !validation }
        onClick={ handlClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
