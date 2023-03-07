import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

describe('Testa o componente Footer', () => {
  it('testa se o botão de drink aparece na tela e muda de rota', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  it('testa se o botão de meals aparece na tela e muda de rota', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals'); //
    });
    const { pathname } = history.location;

    const mealBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealBtn).toBeInTheDocument();
    userEvent.click(mealBtn);
    expect(pathname).toBe('/meals');
  });
});
