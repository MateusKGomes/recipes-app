import React from 'react';
import RenderDrinks from './RenderDrinks';
import RenderMeals from './RenderMeals';

function Recipes() {
  return (
    <div>
      <RenderMeals />
      <RenderDrinks />
    </div>
  );
}

export default Recipes;
