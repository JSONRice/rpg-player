import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './layout';

describe('Layout', () => {
  it('should render and call callbacks', async () => {
    render(
      <Layout>
        <h3>Welcome to Layout</h3>
      </Layout>,
    );

    expect(screen.getByText(/Welcome to Layout/i)).toBeInTheDocument();
  });
});
