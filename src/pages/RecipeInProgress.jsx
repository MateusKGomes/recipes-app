import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FavoriteRecipe from '../components/FavoriteRecipe';
import ShareRecipe from '../components/ShareRecipe';
import { detailsDrink, detailsMeals } from '../services/api';

function RecipeInProgress() {
  const [progressRecipe, setProgressRecipe] = useState({
    meals: [],
    drinks: [],
  });
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  const { id } = useParams();

  const style = {
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const style2 = {
    textDecoration: 'none',
  };

  const fechIdRecipe = async () => {
    if (location.pathname.includes('meals')) {
      const meals = await detailsMeals(id);
      setProgressRecipe({ meals });
    } else {
      const drinks = await detailsDrink(id);
      setProgressRecipe({ drinks });
    }
  };

  const checkStyle = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  useEffect(() => {
    fechIdRecipe();
  }, []);

  const setStyle = isChecked ? style : style2;

  return (
    <div>
      { location.pathname.includes('meals')
        ? progressRecipe?.meals?.map((detailMeals) => (
          <div key={ detailMeals.idMeal }>
            <h3
              data-testid="recipe-title"
            >
              { detailMeals.strMeal }
            </h3>
            <img
              alt={ detailMeals.strMealThumb }
              src={ detailMeals.strMealThumb }
              data-testid="recipe-photo"
            />
            <p
              data-testid="recipe-category"
            >
              {detailMeals.strCategory}
            </p>
            <p>Ingredientes</p>
            <ul>
              { Object.entries(detailMeals).filter((detail) => detail[0]
                .startsWith('strIngredient') && detail[1])
                .map((item, index) => (
                  <li
                    className={ `checked-${index}` }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    <label
                      style={ setStyle }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        name="isChecked"
                        type="checkbox"
                        onChange={ checkStyle }
                      />
                      { item[1] }
                    </label>
                  </li>
                )) }
            </ul>
            <ul>
              { Object.entries(detailMeals).filter((detail) => detail[0]
                .startsWith('strMeasure') && detail[1])
                .map((item, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { item[1] }
                  </li>
                )) }
            </ul>
            <p>Instruções</p>
            <p
              data-testid="instructions"
            >
              { detailMeals.strInstructions }
            </p>
          </div>

        )) : progressRecipe?.drinks?.map((detaildrink) => (
          <div key={ detaildrink.idDrink }>
            <h3
              data-testid="recipe-title"
            >
              { detaildrink.strDrink }
            </h3>
            <img
              alt={ detaildrink.strDrinkThumb }
              src={ detaildrink.strDrinkThumb }
              data-testid="recipe-photo"
            />
            <p
              data-testid="recipe-category"
            >
              {detaildrink.strAlcoholic}
            </p>
            <p>Ingredientes</p>
            <ul>
              { Object.entries(detaildrink).filter((detail) => detail[0]
                .startsWith('strIngredient') && detail[1])
                .map((item, index) => (
                  <li
                    style={ setStyle }
                    key={ index }
                  >
                    <label
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        name="isChecked"
                        type="checkbox"
                        onChange={ checkStyle }
                      />
                      { item[1] }
                    </label>
                  </li>
                )) }
            </ul>
            <ul>
              { Object.entries(detaildrink).filter((detail) => detail[0]
                .startsWith('strMeasure') && detail[1])
                .map((item, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { item[1] }
                  </li>
                )) }
            </ul>
            <p>Instruções</p>
            <p
              data-testid="instructions"
            >
              { detaildrink.strInstructions }
            </p>
          </div>
        ))}
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>

      <ShareRecipe />
      <FavoriteRecipe />
    </div>
  );
}

export default RecipeInProgress;
