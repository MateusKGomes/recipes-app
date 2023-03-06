import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import context from '../context/RecipesContext';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const [searchInput, setSearchInput] = useState(false);
  const title = history.location.pathname.replace('/', '').replace('-', ' ');
  const newTitle = title[0].toUpperCase() + title.substring(1)
    .replace('recipes', 'Recipes');
  const { searchInputValue, setSearchInputValue } = useContext(context);

  const verifyPathname = () => {
    if (pathname === '/meals' || pathname === '/drinks') {
      return true;
    }
  };

  const redirectProfile = () => {
    history.push('/profile');
  };

  const inputSearch = () => {
    if (!searchInput) {
      setSearchInput(true);
    } else {
      setSearchInput(false);
    }
  };

  return (
    <div>
      <header>
        <h1
          data-testid="page-title"
        >
          { newTitle }
        </h1>
        <button
          type="button"
          onClick={ redirectProfile }
        >
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
        {
          verifyPathname()
          && (
            <button
              type="button"
              onClick={ inputSearch }
            >
              <img
                data-testid="search-top-btn"
                alt="search"
                src={ searchIcon }
              />
            </button>
          )
        }
        {
          searchInput
        && <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInputValue(target.value) }
          value={ searchInputValue }
        />
        }
      </header>
      <SearchBar />
    </div>
  );
}

export default Header;
