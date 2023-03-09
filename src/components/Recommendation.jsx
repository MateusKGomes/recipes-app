import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import context from '../context/RecipesContext';
import { requestApiDrinkName, requestApiName } from '../services/api';

function Recommendation() {
  const { recommendations, setRecommendations } = useContext(context);
  const location = useLocation();

  const fetchRecommendation = async () => {
    if (location.pathname.includes('meals')) {
      const meals = await requestApiDrinkName();
      const six = 6;
      const filteredRecipes = meals?.drinks?.filter((el, index) => index < six);
      setRecommendations({ meals: filteredRecipes });
    } else {
      const drinks = await requestApiName();
      const six = 6;
      const filteredRecipes = drinks?.meals?.filter((el, index) => index < six);
      setRecommendations({ drinks: filteredRecipes });
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  return (
    location.pathname.includes('/meal')
      ? (
        <Carousel>
          {recommendations?.meals?.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <p>Recomendações:</p>
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strDrink}
              </p>
              <img
                alt={ item.strDrinkThumb }
                src={ item.strDrinkThumb }
              />

            </div>
          ))}
        </Carousel>
      )
      : (
        <Carousel>
          {recommendations?.drinks?.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <p>Recomendações:</p>
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strMeal}
              </p>
              <img
                alt={ item.strMealThumb }
                src={ item.strMealThumb }
              />

            </div>
          ))}
        </Carousel>
      )
  );
}
export default Recommendation;
