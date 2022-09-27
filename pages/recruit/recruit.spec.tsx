import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Recruit from './recruit';

describe('Recruit', () => {
  it('should render recruit', async () => {
    const mockData = {
      paygroups: [],
      roles: [],
      ranks: [],
      managers: [],
      recruiters: [],
    };

    render(<Recruit data={mockData} />);

    expect(screen.getByText(/New Recruit Invitation/i)).toBeInTheDocument();
  });
});
