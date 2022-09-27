import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from './input';
import Form from './form';
import { act } from 'react-dom/test-utils';

describe('Layout', () => {
  it('should render and call callbacks', async () => {
    render(<Component />);

    expect(screen.getByText(/Welcome User/i)).toBeInTheDocument();

    // If a login is attempted without providing a username there will be an error
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(await screen.findByText(/Username is required/)).toBeInTheDocument();
  });
});

function Component() {
  const defaultValues = {
    username: '',
  };

  return (
    <Form
      onSubmit={() => console.log('Submitted form')}
      defaultValues={defaultValues}
      render={({ register, formState: { errors } }) => {
        return (
          <>
            <h3>Welcome User</h3>
            <div className="divider" />
            <div className="mb-6">
              <Input
                label="User Name"
                name="username"
                register={register}
                errors={errors}
                placeholder="username"
                validation={{ required: 'Username is required.' }}
              />
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Login
            </button>
          </>
        );
      }}
    />
  );
}
