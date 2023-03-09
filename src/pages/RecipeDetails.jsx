import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteRecipe from '../components/FavoriteRecipe';
import Recommendation from '../components/Recommendation';
import RenderIdDetails from '../components/RenderIdDetails';
import ShareRecipe from '../components/ShareRecipe';
import context from '../context/RecipesContext';

function RecipeDetails() {
  const { recipesDetails } = useContext(context);

  const history = useHistory();
  const pathName = history.location.pathname.includes('meals') ? 'meals' : 'drinks';
  const idRecipe = history.location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.idMeal
    : recipesDetails[pathName][0]?.idDrink;

  const recipesInProgress = localStorage
    .getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
  const isRecipe = !Object.keys(recipesInProgress[pathName])
    .some((el) => +el === +idRecipe);

  const style = {
    position: 'fixed',
    bottom: 0,
  };

  const setLocalItems = () => {
    if (history.location.pathname.includes('meals')) {
      history.push(`/meals/${recipesDetails.meals[0].idMeal}/in-progress`);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...recipesInProgress.meals,
          [idRecipe]: [],
        },
        drinks: {
        },
      }));
    } else {
      history.push(`/drinks/${recipesDetails.drinks[0].idDrink}/in-progress`);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
        },
        drinks: {
          [idRecipe]: [],
        },
      }));
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <RenderIdDetails />
      <Recommendation />
      <button
        style={ style }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ setLocalItems }

      >

        { isRecipe ? 'Start Recipe' : 'Continue Recipes' }
      </button>
      <ShareRecipe />
      <FavoriteRecipe />
    </div>
  );
}

export default RecipeDetails;
