import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

describe('testando o componente Recipes', () => {
  it('testando os botões', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    await wait(1500);
    const btnBeef = screen.getByTestId('Beef-category-filter');
    const btnBreakfast = screen.getByTestId('Breakfast-category-filter');
    const btnChicken = screen.getByTestId('Chicken-category-filter');
    const btnDessert = screen.getByTestId('Dessert-category-filter');
    const goatButton = screen.getByTestId('Goat-category-filter');
    const btnAll = screen.getByTestId('All-category-filter');

    expect(btnBeef).toBeInTheDocument();
    expect(btnBreakfast).toBeInTheDocument();
    expect(btnChicken).toBeInTheDocument();
    expect(btnDessert).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
  });

  it('testando o botao de categoria 1', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });
    await wait(1500);

    const btnChicken = screen.getByTestId('Chicken-category-filter');
    userEvent.click(btnChicken);

    await wait(100);
    const recipe = screen.getByTestId('0-card-img');

    expect(recipe).toBeInTheDocument();
  });

  it('testando o botao de categoria 2', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks');
    });
    await wait(1500);

    const ordinaryDrink = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryDrink);

    await wait(100);
    const recipe = screen.getByTestId('0-card-img');

    expect(recipe).toBeInTheDocument();
  });

  it('Acessando os detalhes', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks/178319');
    });
    await wait(1500);
    const title = screen.getByTestId('recipe-title');
    const button = screen.getByTestId('start-recipe-btn');
    button.click();
    expect(title).toBeInTheDocument();
  });
});
