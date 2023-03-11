import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';
import * as mockMealJson from './__mocks__/mock-meal.json';
import * as mockDrinkJson from './__mocks__/mock-drink.json';
import { requestApiName, requestApiLetra, requestApiDrinkIngredients, requestApiDrinkName } from './__mocks__/api';

const input = 'search-top-btn';
const search = 'search-input';
const text = 'Your search must have only 1 (one) character';
const radio = 'first-letter-search-radio';
const textName = 'Sorry, we haven\'t found any recipes for these filters.';
const nameSearchRadio = 'name-search-radio';
const radioName = 'ingredient-search-radio';
const respostaSearch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve({ drinks: [mockDrinkJson], meals: [mockMealJson] }),
});

describe('Testando o componente searchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue('requestAPI'),
    });
  });

  it('testando os inputs radios', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    const radioBtn = screen.getAllByRole('radio');
    expect(radioBtn).toHaveLength(3);
    radioBtn.forEach((radio2) => {
      userEvent.click(radio2);
    });
  });

  it('testando o fetch para a api', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    userEvent.type('chicken');
    const radio3 = screen.getByText(/ingredientes/i);
    userEvent.click(radio3);
    const btnFilter = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(btnFilter);
    expect(fetch).toHaveBeenCalled();
  });

  it('testando o alert no drinks ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'alert').mockReturnValue(text);

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'lemon');
    const firstLetter = screen.getByTestId(radio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);

    expect(global.alert).toHaveBeenCalled();
  });

  it('testando o alert no meals ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert').mockReturnValue(text);

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'chicken');
    const firstLetter = screen.getByTestId(radio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);

    expect(global.alert).toHaveBeenCalled();
  });

  it('testando a requisição das funcões meals api letra', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    });

    await requestApiLetra();

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/meals');
    });

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'c');
    const firstLetter = screen.getByTestId(radio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);
    expect(fetch).toHaveBeenCalled();
  });

  it('testando a requisição das funcões meals name ', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    });

    await requestApiName();

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/meals');
    });

    const searchBtn = screen.getByTestId(input);
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'Moussaka');
    const radioName2 = screen.getByTestId(nameSearchRadio);
    userEvent.click(radioName2);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(fetch).toHaveBeenCalled();
  });

  it('testando a requisição das funcões drinks ingredientes', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    });

    await requestApiDrinkIngredients();

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/drinks');
    });

    const searchBtn = screen.getByTestId(input);
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'lemon');
    const getRadio = screen.getByTestId(radioName);
    userEvent.click(getRadio);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(fetch).toHaveBeenCalled();
  });
  it('testando a requisição das funcões drinks name', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    });

    await requestApiDrinkName();

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/drinks');
    });

    const searchBtn = screen.getByTestId(input);
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'gin');
    const radioName1 = screen.getByTestId(nameSearchRadio);
    userEvent.click(radioName1);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(fetch).toHaveBeenCalled();
  });
  it('testando o alert no drinks ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'alert').mockReturnValue(text);

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'lemon');
    const firstLetter = screen.getByTestId(radio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);

    expect(global.alert).toHaveBeenCalled();
  });

  it('testando o alert no meals ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,

    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert').mockReturnValue(textName);

    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'xablau');
    const firstLetter = screen.getByTestId(nameSearchRadio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);

    expect(global.alert).toHaveBeenCalledTimes(0);
  });
  it('deve mostrar alerta quando não encontrar nenhuma bebida', async () => {
    // Resposta da API não retornando dados
    const fetchMock = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon1') {
          return Promise.resolve({ drinks: null });
        }
      },
    });
    window.fetch = fetchMock;
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/drinks');
    });
    jest.spyOn(global, 'alert').mockReturnValue(text);
    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'lemon1');
    const radioName3 = screen.getByTestId(radioName);
    userEvent.click(radioName3);
    const firstLetter = screen.getByTestId(radio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(global.alert).toHaveBeenCalled();
  });

  it('Deve mostrar um alerta quando não achar nenhuma comida', async () => {
    // Resposta da API não retornando dados
    const fetchMock = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
          return Promise.resolve({ meals: null });
        }
      },
    });
    window.fetch = fetchMock;
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    jest.spyOn(global, 'alert').mockReturnValue(textName);
    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'xablau');
    const firstLetter = screen.getByTestId(nameSearchRadio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });

  it('Deve redirecionar ao pesquisar uma comida', async () => {
    // Resposta da API retornando dados
    window.fetch = respostaSearch;
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    jest.spyOn(global, 'alert').mockReturnValue(textName);
    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'comida');
    const firstLetter = screen.getByTestId(nameSearchRadio);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(history.location.pathname).toEqual('/meals/123');
  });

  it('deve redirecionar ao pesquisar uma bebida', async () => {
    // Resposta da API não retornando dados
    window.fetch = respostaSearch;
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/drinks');
    });
    jest.spyOn(global, 'alert').mockReturnValue(text);
    const profileBtn = screen.getByTestId(input);
    userEvent.click(profileBtn);
    const searchBar = screen.getByTestId(search);
    userEvent.type(searchBar, 'lemon');
    const firstLetter = screen.getByTestId(radio);
    const radioName1 = screen.getByTestId(radioName);
    userEvent.click(radioName1);
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);
    await wait(2000);
    expect(history.location.pathname).toContain('drinks/123');
  });
});
