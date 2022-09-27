import * as React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col gap-10 text-center">
      <h1 className="text-xl font-medium">Congratulations!</h1>
      <p className="text-lg">
        You have successfully submitted your information 🎉
      </p>
      <div className="text-sm italic">
        You can now log in to
        <a className="link" href={`${process.env.NEXT_PUBLIC_APP_URL}`}>
          {' '}
          KIN HOME{' '}
        </a>
        using your email and password.
      </div>
    </div>
  );
}
