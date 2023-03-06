import React, { useMemo, useState } from 'react';
import App from '../App';
import context from './RecipesContext';

function Provider() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const values = useMemo(() => ({
    searchInputValue,
    setSearchInputValue,
    ingredients,
    setIngredients,
    name,
    setName,
    firstLetter,
    setFirstLetter,
    title,
    setTitle,
    login,
    setLogin,
  }), [login, title, ingredients, name, firstLetter, searchInputValue]);

  return (
    <context.Provider value={ values }>
      <App />
    </context.Provider>
  );
}

export default Provider;
