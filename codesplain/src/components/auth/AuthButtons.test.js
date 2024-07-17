import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

const renderComponent = async () => {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );

  await screen.findAllByRole('link');
};
// createServer() -> GET '/api/user' -> { user: null }
describe('When user is not signed in', () => {
  createServer([
    {
      path: '/api/user',
      res: (req) => {
        return {
          user: null,
        };
      },
    },
  ]);

  test('When user is not signed in, sign in and sign up are visible', async () => {
    await renderComponent();

    const signInButton = screen.getByRole('link', {
      name: /sign in/i,
    });

    const signUpButton = screen.getByRole('link', {
      name: /sign up/i,
    });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });

  test('When user is not signed in, sign out is not visible', async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole('link', {
      name: /sign out/i,
    });

    expect(signOutButton).not.toBeInTheDocument();
  });
});

// createServer() -> GET '/api/user' -> { user: { id: 3, email: 'asdf@a.com } }
describe('When user is signed in', () => {
  createServer([
    {
      path: '/api/user',
      res: (req) => {
        return {
          user: {
            id: 3,
            email: 'asdf@a.com',
          },
        };
      },
    },
  ]);

  test('When user is signed in, sign in and sign up are not visible', async () => {
    await renderComponent();

    const signInButton = screen.queryByRole('link', {
      name: /sign in/i,
    });

    const signUpButton = screen.queryByRole('link', {
      name: /sign up/i,
    });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test('When user is signed in, sign out is visible', async () => {
    await renderComponent();
  });
});

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
