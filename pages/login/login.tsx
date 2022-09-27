import * as React from 'react';
import { useRouter } from 'next/router';

import { Notification, Form, Input, Button } from '../../common';

const defaultValues = {
  email: '',
  password: '',
};

export default function Login() {
  const router = useRouter();
  const [isLoginFailed, setIsLoginFailed] = React.useState(false);

  async function login(data: typeof defaultValues) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      setIsLoginFailed(true);
    } else {
      router.replace('/dashboard');
    }
  }

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={login}
      render={({ register, formState: { errors } }) => {
        return (
          <>
            <h3>Login</h3>
            <div className="divider" />
            {isLoginFailed && (
              <div className="mb-6">
                <Notification message="Invalid email or password." />
              </div>
            )}
            <div className="mb-6">
              <Input
                label="Email"
                type="email"
                name="email"
                register={register}
                errors={errors}
                placeholder="john.doe@mail.com"
                validation={{ required: 'Email is required.' }}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                name="password"
                register={register}
                errors={errors}
                placeholder="••••••••"
                validation={{ required: 'Password is required.' }}
              />
            </div>
            <Button label="Login" />
          </>
        );
      }}
    />
  );
}
