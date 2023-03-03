import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

describe('Cobertura dos testes da tela de Header', () => {
  it('testando os inputs', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    const profileInput = screen.getByTestId('profile-top-btn');
    const profileSearch = screen.getByTestId('profile-top-btn');
    expect(profileInput).toBeInTheDocument();
    expect(profileSearch).toBeInTheDocument();
  });

  it('testando a barra de search', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    const profileBtn = screen.getByTestId('search-top-btn');
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.click(profileBtn);
  });
  it('testando a barra de search', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
