import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
        />
        Ingredientes
      </label>
      <label htmlFor="nome">
        <input
          data-testid="name-search-radio"
          id="name"
          type="radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Filtrar
      </button>

    </div>
  );
}

export default SearchBar;
