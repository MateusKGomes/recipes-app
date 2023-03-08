import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/RecipesContext';
import { requestApiName } from '../services/api';

function RenderMeals() {
  const { listOfMealsRecipes, setListOfMealsRecipes } = useContext(context);
  const twelve = 12;
  const renderRecipes = listOfMealsRecipes?.meals;
  let filteredRecipes = renderRecipes?.filter((el, index) => index < twelve);

  const callApi = async () => {
    const allCategorysMeals = await requestApiName();

    filteredRecipes = allCategorysMeals?.meals?.filter((el, index) => index < twelve);
    setListOfMealsRecipes({ filteredRecipes });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      { filteredRecipes?.map((recipe, index) => (
        <Link
          data-testid={ `${index}-recipe-card` }
          to={ `/meals/${recipe.idMeal}` }
          key={ recipe.idMeal }
        >
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
        </Link>
      ))}
    </div>
  );
}

export default RenderMeals;
