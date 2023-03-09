import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/RecipesContext';

function FavoriteRecipe() {
  const style = {
    marginBottom: '30px',
    bottom: 0,
  };

  const { recipesDetails } = useContext(context);
  const history = useHistory();
  const pathName = history.location.pathname.includes('meals') ? 'meals' : 'drinks';
  const id = history.location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.idMeal
    : recipesDetails[pathName][0]?.idDrink;
  const image = history.location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMealThumb
    : recipesDetails[pathName][0]?.strDrinkThumb;
  const name = history.location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMeal
    : recipesDetails[pathName][0]?.strDrink;
  const alcoholicOrNot = history.location.pathname.includes('meals')
    ? ''
    : recipesDetails[pathName][0]?.strAlcoholic;
  const nationality = history.location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strArea
    : '';
  const type = history.location.pathname.includes('meals')
    ? 'meal' : 'drink';
  console.log(recipesDetails);
  console.log(image);
  const saveLocal = () => {
    const favorite = localStorage
      .getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(
        [
          ...favorite,
          {
            id,
            type,
            nationality,
            category: recipesDetails[pathName][0].strCategory,
            alcoholicOrNot,
            name,
            image,
          }],
      ));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        style={ style }
        onClick={ saveLocal }
      >
        Favoritar
      </button>
    </div>
  );
}

export default FavoriteRecipe;
