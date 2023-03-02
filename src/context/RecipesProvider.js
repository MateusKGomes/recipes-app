import React, { useState } from 'react';
import App from '../App';
import context from './RecipesContext';

function Provider() {
  const [login, setLogin] = useState('');

  return (
    <context.Provider value={ login }>
      <App />
    </context.Provider>
  );
}

export default Provider;
