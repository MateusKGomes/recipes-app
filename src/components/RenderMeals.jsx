import React, { useContext } from 'react';
import context from '../context/RecipesContext';

function RenderMeals() {
  const { listOfMealsRecipes } = useContext(context);
  const renderRecipes = listOfMealsRecipes?.meals;
  const twelve = 12;
  const filteredRecipes = renderRecipes?.filter((el, index) => index < twelve);

  return (
    <div>
      {

        filteredRecipes?.map((recipe, index) => (
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal}

            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
          </div>
        ))
      }
    </div>
  );
}

export default RenderMeals;
