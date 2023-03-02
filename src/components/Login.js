import React from 'react';

function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
      />
      <input
        data-testid="password-input"
        type="password"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
