import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/RecipesContext';
import { requestApiDrinkName } from '../services/api';

function RenderDrinks() {
  const { listOfDrinksRecipes, setListOfDrinksRecipes } = useContext(context);

  const renderRecipes = listOfDrinksRecipes?.drinks;
  const twelve = 12;
  const filteredRecipes = renderRecipes?.filter((el, index) => index < twelve);

  const callApi = async () => {
    const allCategorysDrinks = await requestApiDrinkName();
    const drinks = allCategorysDrinks?.drinks?.filter((el, index) => index < twelve);
    setListOfDrinksRecipes({
      drinks });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      {
        filteredRecipes?.map((recipe, index) => (
          <Link
            to={ `/drinks/${recipe.idDrink}` }
            key={ recipe.idDrink }
            data-testid="{ `${index}-recipe-card` }"
          >
            <p
              data-testid="{ `${index}-card-name` }"
            >
              {recipe.strDrink}

            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
          </Link>
        ))
      }
    </div>
  );
}

export default RenderDrinks;
