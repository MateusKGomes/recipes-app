import React, { useMemo, useState } from 'react';
import App from '../App';
import context from './RecipesContext';

function Provider() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [listOfMealsRecipes, setListOfMealsRecipes] = useState([]);
  const [listOfDrinksRecipes, setListOfDrinksRecipes] = useState([]);
  const [categoryButton, setCategoryButton] = useState({
    meals: [],
    drinks: [],
  });
  const [recipesByCategory, setrecipesByCategory] = useState({
    meals: [],
    drinks: [],
  });
  const [recipesDetails, setRecipesDetails] = useState({
    meals: [],
    drinks: [],
  });
  const [recommendations, setRecommendations] = useState({
    meals: [],
    drinks: [],
  });
  const [isFavorite, setIsFavorite] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);

  const [listRecipes, setlistRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);

  const values = useMemo(() => ({
    listRecipes,
    setlistRecipes,
    searchInputValue,
    setSearchInputValue,
    ingredients,
    setIngredients,
    name,
    setName,
    firstLetter,
    setFirstLetter,
    title,
    setTitle,
    login,
    setLogin,
    listOfMealsRecipes,
    setListOfMealsRecipes,
    listOfDrinksRecipes,
    setListOfDrinksRecipes,
    categoryButton,
    setCategoryButton,
    recipesByCategory,
    setrecipesByCategory,
    recipesDetails,
    setRecipesDetails,
    recommendations,
    setRecommendations,
    isFavorite,
    setIsFavorite,
  }), [login,
    listRecipes,
    title,
    ingredients,
    name,
    firstLetter,
    searchInputValue,
    listOfMealsRecipes,
    listOfDrinksRecipes,
    categoryButton,
    recipesByCategory,
    recipesDetails,
    recommendations,
    isFavorite,
  ]);

  return (
    <context.Provider value={ values }>
      <App />
    </context.Provider>
  );
}

export default Provider;
