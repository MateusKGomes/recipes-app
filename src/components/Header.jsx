import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const title = history.location.pathname.replace('/', '').replace('-', ' ')
    .replace('recipes', 'Recipes');

  const verifyPathname = () => {
    if (pathname === '/meals' || pathname === '/drinks') {
      return true;
    }
  };

  return (
    <div>
      <header>
        <h1
          data-testid="page-title"
        >
          {title[0].toUpperCase() + title.substring(1)}
        </h1>
        <button>
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
        {
          verifyPathname()
          && (
            <button>
              <img
                data-testid="search-top-btn"
                alt="search"
                src={ searchIcon }
              />
            </button>
          )
        }
      </header>
    </div>
  );
}

export default Header;
