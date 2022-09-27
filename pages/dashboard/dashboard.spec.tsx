import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Dashboard from './dashboard';

describe('Dashboard', () => {
  it('should render login', async () => {
    render(<Dashboard />);

    expect(screen.getByText('Recruit')).toBeInTheDocument();
    expect(screen.getByText('My Teams')).toBeInTheDocument();
    expect(screen.getByText('Recruitment Funnel')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });
});
