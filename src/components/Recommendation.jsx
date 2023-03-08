import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Carousel from 'react-multi-carousel';
import context from '../context/RecipesContext';
import { requestApiDrinkName, requestApiName } from '../services/api';
import 'react-multi-carousel/lib/styles.css';

function Recommendation() {
//   const lines = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 2,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 2,
//     },
//   };
  const { setRecommendations } = useContext(context);
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
    <div>
      {/* <Carousel
        responsive={ lines }
        slidesToSlide={ 2 }
      >
        { location.pathname.includes('meals')
          ? recommendations?.meals?.map((item, index) => (
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
          ))
          : recommendations?.drinks?.map((item, index) => (
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
          )) }
      </Carousel> */}

    </div>
  );
}

export default Recommendation;
