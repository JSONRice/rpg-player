import * as React from 'react';
import { useRouter } from 'next/router';

import UserInfo from './user-info';
import { SelectItem, UserInfoProps } from '../../common';

export default function Index({ data }: UserInfoProps) {
  const router = useRouter();
  const { userId } = router.query;

  return <UserInfo userId={userId} data={data} />;
}

export async function getServerSideProps() {
  const [states] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}geographies`).then(res => res.json()),
  ]);

  const data = {
    data: {
      states: states.map(toSelectItem),
    },
  };

  return {
    props: data,
  };
}

function toSelectItem(item: { id: number; region: string }): SelectItem {
  return {
    id: item.id,
    name: item.region,
  };
}
