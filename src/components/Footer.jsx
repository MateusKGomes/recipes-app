import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const style = {
  position: 'fixed',
  bottom: 0,
};

export default function Footer() {
  const history = useHistory();

  return (
    <div>
      <footer data-testid="footer" style={ style }>

        <button
          type="button"
          onClick={ () => history.push('/drinks') }
        >
          <img
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/meals') }
        >
          <img
            data-testid="meals-bottom-btn"
            alt="meal"
            src={ mealIcon }
          />
        </button>

      </footer>
    </div>
  );
}
