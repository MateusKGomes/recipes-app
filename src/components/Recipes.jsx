import React from 'react';
import RenderDrinks from './RenderDrinks';
import RenderMeals from './RenderMeals';
import CategoryButton from './CategoryButton';

function Recipes() {
  return (
    <div>
      <CategoryButton />
      <RenderMeals />
      <RenderDrinks />
    </div>
  );
}

export default Recipes;
