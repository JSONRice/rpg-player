import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './login';

describe('Login', () => {
  it('should render login', async () => {
    render(<Login />);

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });
});
