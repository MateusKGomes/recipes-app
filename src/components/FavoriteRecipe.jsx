import React from 'react';

function FavoriteRecipe() {
  const style = {
    marginBottom: '30px',
    bottom: 0,
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        style={ style }
      >
        Favoritar
      </button>
    </div>
  );
}

export default FavoriteRecipe;
