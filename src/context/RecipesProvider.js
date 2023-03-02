import React, { useMemo, useState } from 'react';
import App from '../App';
import context from './RecipesContext';

function Provider() {
  const [login, setLogin] = useState({ email: '', password: '' });

  const values = useMemo(() => ({
    login,
    setLogin,
  }), [login]);

  return (
    <context.Provider value={ values }>
      <App />
    </context.Provider>
  );
}

export default Provider;
