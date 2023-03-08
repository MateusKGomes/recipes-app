export const requestApiIngredients = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiName = async (nome = '') => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiLetra = async (letra) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiDrinkIngredients = async (ingredienteDrink) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredienteDrink}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiDrinkName = async (nomeDrink = '') => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nomeDrink}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiDrinkLetra = async (letraDrink) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letraDrink}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const five = 5;
    const filterCategory = data.meals.filter((__el, index) => index < five);
    return filterCategory;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const five = 5;
    const filterCategory = data.drinks.filter((__el, index) => index < five);
    return filterCategory;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryMealsAPI = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryDrinksAPI = async (category) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error.message);
  }
};
