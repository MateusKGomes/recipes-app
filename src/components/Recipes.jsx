import React from 'react';
import RenderDrinks from './RenderDrinks';
import RenderMeals from './RenderMeals';
import CategoryButton from './CategoryButton';

function Recipes() {
  return (
    <div>
      <RenderMeals />
      <RenderDrinks />
      <CategoryButton />
    </div>
  );
}

export default Recipes;
