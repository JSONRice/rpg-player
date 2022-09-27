import * as React from 'react';
import Image from 'next/image';
import router from 'next/router';

import { Button, User } from '../../common';

export interface MyTeamsProps {
  data: {
    users: User[];
  };
}

export default function MyTeams({ data: { users } }: MyTeamsProps) {
  return (
    <div className="flex flex-col">
      <h3>My Teams</h3>
      <div className="divider" />
      <div className="flex justify-end mb-6">
        <div className="shadow-xl w-full md:w-52">
          <Button label="Recruit+" onClick={() => router.push('/recruit')} />
        </div>
      </div>
      {users.map((user: User) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const { firstName, lastName, email, status, activeDate } = user;
  return (
    <div className="card shadow-xl mb-10">
      <div className="card-body">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <figure>
            <div className="avatar">
              <div className="w-34 h-26 rounded-xl">
                {/* TODO: replace with uploaded user image */}
                <Image
                  src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
                  alt="User Profile Avatar"
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </figure>
          {firstName && lastName && (
            <p className="text-lg self-center font-medium">{`${firstName} ${lastName}`}</p>
          )}
        </div>
        <div className="divider" />
        <div>
          <p>{email}</p>
          {activeDate && (
            <p>Active Date: {new Date(activeDate).toLocaleDateString()}</p>
          )}
          <p>Status: {status}</p>
        </div>
        <div className="flex justify-end">
          <div className="w-16">
            <Button label="Edit" variant="link" isActive={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
