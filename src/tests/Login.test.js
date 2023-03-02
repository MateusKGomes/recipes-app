import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Provider from '../context/RecipesProvider';
import renderWithRouter from './helpers/RenderWithRouter';

const input = 'password-input';

describe('Verifica a cobertura de 45% da tela de Login', () => {
  it('Testa a tela de login 1', () => {
    render(
      <MemoryRouter>
        <Provider>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId(input);
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  it('Testa a tela de login 2', () => {
    render(
      <MemoryRouter>
        <Provider>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId(input);
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });
});
describe('Verifica a cobertura de 90% da tela de Login', () => {
  it('Testa a tela de login 3', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(input);
    const loginButton = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
