import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteRecipe from '../components/FavoriteRecipe';
import Recommendation from '../components/Recommendation';
import RenderIdDetails from '../components/RenderIdDetails';
import ShareRecipe from '../components/ShareRecipe';
import context from '../context/RecipesContext';

function RecipeDetails() {
  const { recipesDetails } = useContext(context);

  const history = useHistory();
  const location = useLocation();

  // const [ingredients, setIngredients] = useState([]);
  const pathName = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const idRecipe = location.pathname.includes('meals')
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

  const image = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMealThumb
    : recipesDetails[pathName][0]?.strDrinkThumb;
  const tittle = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMeal
    : recipesDetails[pathName][0]?.strDrink;
  const alcoholicOrNot = location.pathname.includes('meals')
    ? ''
    : recipesDetails[pathName][0]?.strAlcoholic;

  const type = location.pathname.includes('meals')
    ? 'meal' : 'drink';

  const category = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strCategory
    : recipesDetails[pathName][0]?.strAlcoholic;

  const instructions = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strInstructions
    : recipesDetails[pathName][0]?.strInstructions;

  const ingredients = recipesDetails[pathName]?.map(() => (
    Object.entries(recipesDetails[pathName][0])
      .filter((item) => item[0]
        .startsWith('strIngredient') && item[1])?.map((el) => el[1])
  ));

  const setLocalItems = () => {
    if (location.pathname.includes('meals')) {
      history.push(`/meals/${recipesDetails.meals[0].idMeal}/in-progress`);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...recipesInProgress.meals,
          [idRecipe]: [
            ingredients,
            image,
            tittle,
            category,
            type,
            instructions,
          ],
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
          [idRecipe]: [
            ingredients,
            image,
            tittle,
            alcoholicOrNot,
            category,
            type,
            instructions,
          ],
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
