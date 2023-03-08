import React from 'react';
import { useLocation } from 'react-router-dom';
import RenderDrinks from './RenderDrinks';
import RenderMeals from './RenderMeals';
import CategoryButton from './CategoryButton';

function Recipes() {
  const location = useLocation();
  return (
    <div>
      <CategoryButton />
      { location.pathname.includes('meals')
        ? <RenderMeals />
        : <RenderDrinks />}
    </div>
  );
}

export default Recipes;
