import * as React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { User } from '../../common';
import UserInfo from './user-info';

const states = [
  { id: 1, name: 'Nex Mexico', description: '' },
  { id: 2, name: 'Missouri', description: '' },
  { id: 3, name: 'Texas', description: '' },
];

const users: User[] = [];

const mockedReplace = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockedReplace,
  }),
}));

describe('UserInfo', () => {
  it('should render user-info', async () => {
    render(<UserInfo userId={'5'} data={{ states, users }} />);

    expect(screen.getByText(/New Account/i)).toBeInTheDocument();
  });

  it('should notify onSubmit', async () => {
    render(<UserInfo userId={'5'} data={{ states, users }} />);

    // Add some data to the input fields:
    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    });

    const lastName = screen.getByRole('textbox', {
      name: /last name/i,
    });

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });

    const password = screen.getByLabelText('Password');
    const confirmPassword = screen.getByLabelText('Confirm Password');

    const phone = screen.getByRole('textbox', {
      name: /phone/i,
    });

    const address = screen.getByRole('textbox', {
      name: /primary address/i,
    });

    const city = screen.getByRole('textbox', {
      name: /city/i,
    });

    const state = screen.getByRole('combobox');

    const zip = screen.getByRole('textbox', {
      name: /zip code/i,
    });

    await act(async () => {
      fireEvent.change(firstName, {
        target: { value: 'John' },
      });

      fireEvent.change(lastName, {
        target: { value: 'Jacob' },
      });

      fireEvent.change(email, {
        target: { value: 'jingle@alltheway.usa' },
      });

      fireEvent.change(password, {
        target: { value: 'Somethingwicked$this&ayComes' },
      });

      fireEvent.change(confirmPassword, {
        target: { value: 'Somethingwicked$this&ayComes' },
      });

      fireEvent.change(phone, {
        target: { value: '123-456-7899' },
      });

      fireEvent.change(address, { target: { value: '123 Boardwalk Way' } });

      fireEvent.change(city, {
        target: { value: 'Fresno' },
      });

      fireEvent.change(state, {
        target: { value: 1 },
      });

      fireEvent.change(zip, {
        target: { value: '84043' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    waitFor(() => {
      expect(mockedReplace).toHaveBeenCalledWith('/user-info/submit-success');
    });
  });
});
