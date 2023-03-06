import React, { useContext } from 'react';
import context from '../context/RecipesContext';

function RenderDrinks() {
  const { listOfDrinksRecipes } = useContext(context);

  const renderRecipes = listOfDrinksRecipes?.drinks;
  const twelve = 12;
  const filteredRecipes = renderRecipes?.filter((el, index) => index < twelve);
  return (
    <div>
      {
        filteredRecipes?.map((recipe, index) => (
          <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe.strDrink}

            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
          </div>
        ))
      }
    </div>
  );
}

export default RenderDrinks;
