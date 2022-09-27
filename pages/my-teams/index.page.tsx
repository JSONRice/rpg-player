import * as React from 'react';
import MyTeams, { MyTeamsProps } from './my-teams';

export default function MyTeamsPage({ data }: MyTeamsProps) {
  return <MyTeams data={data} />;
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}users`);
  const users = await response.json();

  // TODO: return only the users who have the currently logged-in user as their manager.

  return {
    props: { data: { users } },
  };
}
