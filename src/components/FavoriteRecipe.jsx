import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipe() {
  const style = {
    marginBottom: '30px',
    bottom: 0,
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const { recipesDetails } = useContext(context);

  const history = useHistory();
  const pathName = history.location.pathname.includes('meals') ? 'meals' : 'drinks';

  const location = useLocation();
  const params = location.pathname.split('/');
  const id = (params[params.length - 1]);
  //   const id = history.location.pathname.includes('meals')
  //     ? recipesDetails[pathName][0]?.idMeal
  //     : recipesDetails[pathName][0]?.idDrink;
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

  const saveLocal = () => {
    const favorite = localStorage
      .getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    if (favorite
      .some((el) => +el.id === +id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(favorite.filter((item) => +item.id !== +id)));
      setIsFavorite(false);
    } else {
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
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const favorite = localStorage
      .getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    if (favorite
      .some((el) => +el.id === +id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  const heartIcon = isFavorite ? blackHeartIcon : whiteHeartIcon;
  return (
    <div>
      <button
        type="button"
        style={ style }
        onClick={ saveLocal }
      >
        <img data-testid="favorite-btn" src={ heartIcon } alt="toggle-favorite" />
      </button>
    </div>
  );
}

export default FavoriteRecipe;
