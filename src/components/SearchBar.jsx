import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/RecipesContext';
import { requestApiDrinkIngredients,
  requestApiDrinkLetra,
  requestApiDrinkName,
  requestApiIngredients,
  requestApiLetra,
  requestApiName } from '../services/api';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;

  const {
    setIngredients,
    setName,
    setFirstLetter,
    ingredients,
    name,
    firstLetter,
    setListOfMealsRecipes,
    setListOfDrinksRecipes,
    searchInputValue } = useContext(context);

  const id = pathname.includes('/meals') ? 'idMeal' : 'idDrink';

  const verifyResultMeal = (param) => {
    if (param?.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (param?.meals?.length === 1) {
      history.push(`meals/${param.meals[0][id]}`);
    }
  };

  const verifyResultDrink = (param) => {
    if (param?.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (param?.drinks?.length === 1) {
      history.push(`drinks/${param.drinks[0][id]}`);
    }
  };

  const handleClickMeals = async () => {
    if (ingredients === 'ingredients') {
      const results = await requestApiIngredients(searchInputValue);
      verifyResultMeal(results);
      console.log(results);
      setListOfMealsRecipes(results);
    }
    if (name === 'name') {
      const results = await requestApiName(searchInputValue);
      verifyResultMeal(results);
      setListOfMealsRecipes(results);
    }
    if (firstLetter === 'firstLetter') {
      if (searchInputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const results = await requestApiLetra(searchInputValue);
      setListOfMealsRecipes(results);
      verifyResultMeal(results);
    }
  };

  const handleClickDrinks = async () => {
    if (ingredients === 'ingredients') {
      const results = await requestApiDrinkIngredients(searchInputValue);
      setListOfDrinksRecipes(results);
      verifyResultDrink(results);
    }
    if (name === 'name') {
      const results = await requestApiDrinkName(searchInputValue);
      setListOfDrinksRecipes(results);
      verifyResultDrink(results);
    }
    if (firstLetter === 'firstLetter') {
      if (searchInputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const results = await requestApiDrinkLetra(searchInputValue);
      setListOfDrinksRecipes(results);
      verifyResultDrink(results);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="options"
          type="radio"
          onClick={ ({ target }) => setIngredients(target.value) }
          value="ingredients"
        />
        Ingredientes
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="options"
          id="name"
          type="radio"
          onClick={ ({ target }) => setName(target.value) }
          value="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
          name="options"
          onClick={ ({ target }) => setFirstLetter(target.value) }
          value="firstLetter"
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => (
          history.location.pathname === '/drinks'
            ? handleClickDrinks() : handleClickMeals()) }
      >
        Filtrar
      </button>

    </div>
  );
}

export default SearchBar;
