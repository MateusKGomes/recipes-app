import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const get = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(get);
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { get.map((item, index) => (
        <div key={ index }>
          <img
            src=""
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          />
          <p
            data-testid={ `${index}-horizontal-name` }
          />
          <p
            data-testid={ `${index}-horizontal-done-date` }
          />
          { item.tags.map((tag, index2) => (
            <p
              key={ index2 }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}

          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
          >
            Compartilhar
          </button>
        </div>

      ))}

    </div>
  );
}

export default DoneRecipes;
