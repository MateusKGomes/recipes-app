import React from 'react';
import Recommendation from '../components/Recommendation';
import RenderIdDetails from '../components/RenderIdDetails';

function RecipeDetails() {
  const style = {
    position: 'fixed',
    bottom: 0,
  };
  return (
    <div>
      <RenderIdDetails />
      <Recommendation />
      <button
        style={ style }
        type="button"
        data-testid="start-recipe-btn"
      >
        iniciar Receita
      </button>
    </div>
  );
}

export default RecipeDetails;
