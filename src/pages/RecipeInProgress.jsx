import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import FavoriteRecipe from '../components/FavoriteRecipe';
import ShareRecipe from '../components/ShareRecipe';
import { detailsDrink, detailsMeals } from '../services/api';
import context from '../context/RecipesContext';

function RecipeInProgress() {
  const { isDone, setIsDone, setRecipesDetails } = useContext(context);
  const history = useHistory();
  const [progressRecipe, setProgressRecipe] = useState({
    meals: [],
    drinks: [],
  });
  const ingredientesSalvos = localStorage.getItem('ingredientesChecados');
  const [ingredientesChecados, setIngredientesChecados] = useState(
    JSON.parse(ingredientesSalvos || '[]'),
  );
  const location = useLocation();
  const { id } = useParams();
  const pathName = location.pathname.includes('meals') ? 'meals' : 'drinks';
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
      setRecipesDetails({ meals });
    } else {
      const drinks = await detailsDrink(id);
      setProgressRecipe({ drinks });
      setRecipesDetails({ drinks });
    }
  };
  const checkStyle = (itemChecado, itemNome) => {
    const listaIngredientes = ingredientesChecados.filter(
      (ingrediente) => ingrediente !== itemNome,
    );
    if (itemChecado) {
      listaIngredientes.push(itemNome);
    }
    setIngredientesChecados(listaIngredientes);
    localStorage.setItem('ingredientesChecados', JSON.stringify(listaIngredientes));
  };
  const ingredients = progressRecipe[pathName]?.map(() => (
    Object.entries(progressRecipe[pathName][0])
      .filter((item) => item[0]
        .startsWith('strIngredient') && item[1])?.map((el) => el[1])
  ));
  const checkedDisabled = ingredients[0]?.length === ingredientesChecados?.length;
  console.log(checkedDisabled);
  const image = location.pathname.includes('meals')
    ? progressRecipe[pathName][0]?.strMealThumb
    : progressRecipe[pathName][0]?.strDrinkThumb;
  const name = location.pathname.includes('meals')
    ? progressRecipe[pathName][0]?.strMeal
    : progressRecipe[pathName][0]?.strDrink;
  const alcoholicOrNot = location.pathname.includes('meals')
    ? ''
    : progressRecipe[pathName][0]?.strAlcoholic;
  const nationality = location.pathname.includes('meals')
    ? progressRecipe[pathName][0]?.strArea
    : '';
  const type = location.pathname.includes('meals')
    ? 'meal' : 'drink';

  const saveRecipe = () => {
    // if (isDone.some((el) => +el.id === +id)) {
    //   localStorage.setItem('doneRecipes', JSON
    //     .stringify(setIsDone(isDone.filter((item) => +item.id !== +id))));
    // } else {
    console.log([
      ...isDone,
      {
        id,
        type,
        nationality,
        category: progressRecipe[pathName][0]?.strCategory,
        alcoholicOrNot,
        name,
        image,
      }]);
    localStorage.setItem('doneRecipes', JSON
      .stringify([
        ...isDone,
        {
          id,
          type,
          nationality,
          category: progressRecipe[pathName][0]?.strCategory,
          alcoholicOrNot,
          name,
          image,
        }]));
    // }
    history.push('/done-recipes');
  };

  console.log(isDone);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON
      .stringify(isDone));
    localStorage.getItem('doneRecipes');
  }, [isDone]);

  useEffect(() => {
    fechIdRecipe();
  }, []);

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
                      style={ ingredientesChecados.includes(item[1]) ? style : style2 }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        name="isChecked"
                        defaultChecked={ ingredientesChecados.includes(item[1]) }
                        type="checkbox"
                        onChange={
                          ($event) => checkStyle($event.target.checked, item[1])
                        }
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
                    key={ index }
                  >
                    <label
                      style={ ingredientesChecados.includes(item[1]) ? style : style2 }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        name="isChecked"
                        defaultChecked={ ingredientesChecados.includes(item[1]) }
                        type="checkbox"
                        onChange={
                          ($event) => checkStyle($event.target.checked, item[1])
                        }
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
        disabled={ !checkedDisabled }
        onClick={ saveRecipe }
      >
        Finish Recipe
      </button>

      <ShareRecipe />
      <FavoriteRecipe />
    </div>
  );
}

export default RecipeInProgress;
