export const requestApiIngredients = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const requestApiName = async (nome) => {
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

export const requestApiDrinkName = async (nomeDrink) => {
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
