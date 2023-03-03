import React, { useContext } from 'react';
import context from '../context/RecipesContext';
import { requestApiIngredients, requestApiLetra, requestApiName } from '../services/api';

function SearchBar() {
  const {
    setIngredients,
    setName,
    setFirstLetter,
    ingredients,
    name,
    firstLetter,
    searchInputValue } = useContext(context);

  const handleClick = async () => {
    if (ingredients === 'ingredients') {
      await requestApiIngredients(searchInputValue);
    }
    if (name === 'name') {
      await requestApiName(searchInputValue);
    }
    if (firstLetter === 'firstLetter') {
      if (searchInputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      await requestApiLetra(searchInputValue);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
          onClick={ ({ target }) => setIngredients(target.value) }
          value="ingredients"
        />
        Ingredientes
      </label>
      <label htmlFor="nome">
        <input
          data-testid="name-search-radio"
          id="name"
          type="radio"
          onClick={ ({ target }) => setName(target.value) }
          value="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
          onClick={ ({ target }) => setFirstLetter(target.value) }
          value="firstLetter"
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </div>
  );
}

export default SearchBar;
