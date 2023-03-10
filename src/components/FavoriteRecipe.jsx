import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import context from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipe() {
  const style = {
    marginBottom: '30px',
    bottom: 0,
  };

  const { recipesDetails, isFavorite, setIsFavorite } = useContext(context);

  const location = useLocation();
  const pathName = location.pathname.includes('meals') ? 'meals' : 'drinks';

  const { id } = useParams();

  // const params = location.pathname.split('/');
  // const id = (params[params.length - 1]);
  //   const id = history.location.pathname.includes('meals')
  //     ? recipesDetails[pathName][0]?.idMeal
  //     : recipesDetails[pathName][0]?.idDrink;
  const image = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMealThumb
    : recipesDetails[pathName][0]?.strDrinkThumb;
  const name = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strMeal
    : recipesDetails[pathName][0]?.strDrink;
  const alcoholicOrNot = location.pathname.includes('meals')
    ? ''
    : recipesDetails[pathName][0]?.strAlcoholic;
  const nationality = location.pathname.includes('meals')
    ? recipesDetails[pathName][0]?.strArea
    : '';
  const type = location.pathname.includes('meals')
    ? 'meal' : 'drink';

  const saveLocal = () => {
    // const favorite = localStorage
    //   .getItem('favoriteRecipes')
    //   ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    if (isFavorite
      .some((el) => +el.id === +id)) {
      setIsFavorite(isFavorite.filter((item) => +item.id !== +id));
    } else {
      setIsFavorite(
        [
          ...isFavorite,
          {
            id,
            type,
            nationality,
            category: recipesDetails[pathName][0]?.strCategory,
            alcoholicOrNot,
            name,
            image,
          }],
      );
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(isFavorite));
  }, [isFavorite]);

  useEffect(() => {
    const favorite = localStorage
      .getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setIsFavorite(favorite);
  }, []);

  return (
    <div>
      <button
        type="button"
        style={ style }
        onClick={ saveLocal }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite
            .some((el) => +el.id === +id) ? blackHeartIcon : whiteHeartIcon }
          alt="toggle-favorite"
        />
      </button>
    </div>
  );
}

export default FavoriteRecipe;
