import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { detailsMeals, detailsDrink } from '../services/api';
import context from '../context/RecipesContext';

function RenderIdDetails() {
  const { recipesDetails, setRecipesDetails } = useContext(context);
  const sliceNumber = 7;
  const sliceNumber2 = 8;
  const location = useLocation();
  const id = location.pathname;
  const getIdMeals = id.slice(sliceNumber);
  const getIdDrinks = id.slice(sliceNumber2);

  const fetchDetailId = async () => {
    if (location.pathname.includes('meals')) {
      const meals = await detailsMeals(getIdMeals);
      setRecipesDetails({ ...recipesDetails, meals });
    } else {
      const drinks = await detailsDrink(getIdDrinks);
      setRecipesDetails({ ...recipesDetails, drinks });
    }
  };

  useEffect(() => {
    fetchDetailId();
  }, []);

  return (
    <div>
      { location.pathname.includes('meals')
        ? recipesDetails?.meals?.map((detailMeals) => (
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
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { item[1] }
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
            <iframe
              data-testid="video"
              title={ detailMeals.strArea }
              width="640"
              height="300"
              src={ `https://www.youtube.com/embed/${detailMeals.strYoutube
                .replace('https://www.youtube.com/watch?v=', '')}` }
              allowFullScreen
            >
              Video

            </iframe>
          </div>

        )) : recipesDetails?.drinks?.map((detaildrink) => (
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
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { item[1] }
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
    </div>
  );
}

export default RenderIdDetails;
