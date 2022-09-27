import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Kin Home</title>
        <link rel="favorite icon" href="/kin-home.png" />
      </Head>
      <nav className="flex w-full justify-between pl-4 pr-4 py-4 bg-gray-100 text-gray-500 shadow-lg">
        <Image src="/kin-home.png" alt="Kin Home" height={40} width={40} />
      </nav>
      <main className="flex justify-center">
        <div className="flex w-full flex-col p-6 md:w-5/6 lg:w-3/5 xl:w-1/2">
          {children}
        </div>
      </main>
    </>
  );
}
