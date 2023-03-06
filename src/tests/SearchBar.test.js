import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';
import { requestApiName, requestApiLetra, requestApiDrinkIngredients, requestApiDrinkName } from './__mocks__/api';

const input = 'search-top-btn';
const search = 'search-input';
const text = 'Your search must have only 1 (one) character';
const radio = 'first-letter-search-radio';
const textName = 'Sorry, we haven\'t found any recipes for these filters.';

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
    const radioName = screen.getByTestId('name-search-radio');
    userEvent.click(radioName);
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
    const radioName = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioName);
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
    const radioName = screen.getByTestId('name-search-radio');
    userEvent.click(radioName);
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
    const firstLetter = screen.getByTestId('name-search-radio');
    userEvent.click(firstLetter);
    const filterbtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    userEvent.click(filterbtn);

    await wait(2000);

    expect(global.alert).toHaveBeenCalled();
  });
});
