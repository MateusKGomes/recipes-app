import React, { useContext } from 'react';
import context from '../context/RecipesContext';
import { categoryMeals } from '../services/api';

function CategoryButton() {
  const { categoryButton } = useContext(context);
  return (
    <div>
      <button
        type="button"
        // data-testid={ `${categoryName}-category-filter` }
        onClick={ categoryMeals }
      >
        category Button

      </button>
    </div>
  );
}

export default CategoryButton;
