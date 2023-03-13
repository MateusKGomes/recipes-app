import React from 'react';
import { useHistory } from 'react-router-dom';

function ProfileDetails() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));
  console.log(!!userEmail);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('ingredientesChecados');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('doneRecipes');
    history.push('/');
  };

  return (
    <div>
      <p
        data-testid="profile-email"
      >
        { userEmail ? userEmail.email : 'email@email.com' }

      </p>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }

      >
        Logout
      </button>

    </div>
  );
}

export default ProfileDetails;
