import copy from 'clipboard-copy';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipe() {
  const [copyMessage, setCopyMessage] = useState(false);

  const message = () => {
    copy(window.location.href);
    setCopyMessage(true);
  };
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ message }
      >
        <img
          src={ shareIcon }
          alt="Compartilhar"
        />
      </button>
      {
        copyMessage && <p>Link copied!</p>
      }
    </div>
  );
}

export default ShareRecipe;
