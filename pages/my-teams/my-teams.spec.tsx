import * as React from 'react';
import { render, screen } from '@testing-library/react';

import MyTeams from './my-teams';
import { User } from '../../common';

const users: User[] = [];

describe('UserInfo', () => {
  it('should render user-info', async () => {
    render(<MyTeams data={{ users }} />);

    expect(screen.getByText(/My Teams/i)).toBeInTheDocument();
  });
});
