import * as React from 'react';

import { SelectItem } from 'common';
import Recruit, { RecruitProps } from './recruit';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export default function Index({ data }: RecruitProps) {
  return <Recruit data={data} />;
}

export async function getServerSideProps() {
  const [roles, ranks, payGroups, users] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}roles`).then(res => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API}ranks`).then(res => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API}pay-groups`).then(res => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API}users`).then(res => res.json()),
  ]);

  const managersRecruiters = users
    .filter((user: User) => user.firstName && user.lastName)
    .map(
      (user: User): SelectItem => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
      }),
    );

  const data: RecruitProps = {
    data: {
      paygroups: payGroups.map(toSelectItem),
      roles: roles.map(toSelectItem),
      ranks: ranks.map(toSelectItem),
      managers: managersRecruiters,
      recruiters: managersRecruiters,
    },
  };

  return {
    props: data,
  };
}

function toSelectItem(item: SelectItem): SelectItem {
  return {
    id: item.id,
    name: item.name,
  };
}
