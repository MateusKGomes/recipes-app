import { act, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

jest.spyOn(global, 'fetch');
global.fetch.mockResolvedValue({
  json: jest.fn().mockResolvedValue(fetch),
});

describe('testa o componente Recipes', () => {
  it.only('testa se as receitas são renderezidas na tela', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    await wait(2000);
    const recipes = screen.getByTestId('0-recipe-card');
    expect(recipes).toBeInTheDocument();
  });
});
