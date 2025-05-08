'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Profile = () => {
  const session = useSession();
  const name: string | null | undefined = session.data?.user?.name;
  const { status } = session;

  if (status === 'authenticated') {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    );
  } else if (status === 'loading') {
    return <p>loading...</p>;
  } else if (status === 'unauthenticated') {
    return (
      <div>
        <Link href='/login' className='border border-solid border-black rounded my-5 p-1'>
          Sign In
        </Link>
      </div>
    );
  }
};

export default Profile;
