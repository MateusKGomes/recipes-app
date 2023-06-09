import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import context from '../context/RecipesContext';
import { categoryMeals,
  categoryDrinks,
  categoryMealsAPI,
  categoryDrinksAPI,
  requestApiDrinkName,
  requestApiName,
} from '../services/api';

function CategoryButton() {
  const { categoryButton,
    setCategoryButton,
    recipesByCategory,
    setrecipesByCategory,
    setListOfMealsRecipes,
    setListOfDrinksRecipes,
  } = useContext(context);

  const [bolleanCategory, setBolleanCategory] = useState(false);

  const history = useHistory();

  const setCategory = async () => {
    const filterMeals = await categoryMeals();
    const filterDrinks = await categoryDrinks();
    setCategoryButton({
      meals: filterMeals,
      drinks: filterDrinks,
    });
  };

  const filterButton = async (category) => {
    if (history.location.pathname === '/meals') {
      const filterRecipes = await categoryMealsAPI(category);
      const twelve = 12;
      const meals = filterRecipes.filter((el, index) => index < twelve);
      setrecipesByCategory({
        meals,
      });
      setBolleanCategory(!bolleanCategory);
    } else {
      const filterRecipes = await categoryDrinksAPI(category);
      const twelve = 12;
      const drinks = filterRecipes.filter((el, index) => index < twelve);
      setrecipesByCategory({
        drinks,
      });
      setBolleanCategory(!bolleanCategory);
    }
    setListOfMealsRecipes([]);
    setListOfDrinksRecipes([]);
  };

  const allCategory = async () => {
    const twelve = 12;

    if (history.location.pathname === '/meals') {
      const allCategorysMeals = await requestApiName();
      const meals = allCategorysMeals?.meals?.filter((el, index) => index < twelve);
      setrecipesByCategory({
        meals,
      });
    } else {
      const allCategorysDrinks = await requestApiDrinkName();
      const drinks = allCategorysDrinks?.drinks?.filter((el, index) => index < twelve);
      setrecipesByCategory({
        drinks,
      });
    }
  };

  useEffect(() => {
    if (bolleanCategory === false) {
      allCategory();
    }
    setCategory();
  }, [bolleanCategory]);

  return (
    <div>
      {
        history.location.pathname === '/meals'
          ? categoryButton?.meals?.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => filterButton(strCategory) }
            >
              { strCategory }

            </button>
          ))
          : categoryButton?.drinks?.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => filterButton(strCategory) }
            >
              { strCategory }

            </button>
          ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ allCategory }
      >
        All
      </button>
      {
        history.location.pathname === '/meals'
          ? recipesByCategory?.meals?.map((recipe, index) => (
            <Link
              to={ `/meals/${recipe.idMeal}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
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
            </Link>
          ))
          : recipesByCategory?.drinks?.map((recipe, index) => (
            <Link
              to={ `/drinks/${recipe.idDrink}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                {recipe.strDrink}

              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
            </Link>
          ))
      }
    </div>
  );
}

export default CategoryButton;
