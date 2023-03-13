import { act, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

describe('Teste de cobertura da tela RecipeInProgress', () => {
  test('Redendizando a tela', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks/178319/in-progress');
    });
    await wait(1500);

    const title = screen.getByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  test('Deve clicar em um checkbox de ingrediente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks/178319/in-progress');
    });
    await wait(1500);

    const checkbox = screen.getAllByTestId('0-ingredient-name-and-measure')[0];
    // Marcar item
    checkbox.click();
    // Desmarcar item
    checkbox.click();
    expect(checkbox).toBeInTheDocument();
  });
});
