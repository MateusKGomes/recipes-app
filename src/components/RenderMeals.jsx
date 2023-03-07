import React, { useContext, useEffect } from 'react';
import context from '../context/RecipesContext';
import { requestApiName } from '../services/api';

function RenderMeals() {
  const { listOfMealsRecipes, setListOfMealsRecipes } = useContext(context);
  const twelve = 12;
  // const filrteFunction = () => {
  const renderRecipes = listOfMealsRecipes?.meals;
  const filteredRecipes = renderRecipes?.filter((el, index) => index < twelve);
  // setListOfMealsRecipes(filteredRecipes);
  // };

  const callApi = async () => {
    const allCategorysMeals = await requestApiName();
    //   setrecipesByCategory(allCategorysMeals);
    const meals = allCategorysMeals?.meals?.filter((el, index) => index < twelve);
    setListOfMealsRecipes({
      meals });
  };

  useEffect(() => {
    callApi();
  }, []);

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
