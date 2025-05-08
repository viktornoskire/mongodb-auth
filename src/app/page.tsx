'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useSession();
  const { status } = session;
  const name: string | null | undefined = session.data?.user?.name;
  const router = useRouter();

  const showSession = () => {
    if (status === 'authenticated') {
      return (
        <div className='flex flex-col items-center justify-center'>
          <p>Welcome back {name}</p>
          <p>
            You can now take advantage of our <strong>amazing deals!</strong>
          </p>
          <p>
            <strong>20% OFF</strong> of your first purchase and then <strong>10%</strong>
          </p>
          <button
            className='border border-solid border-black rounded p-1 my-5'
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push('/');
              });
            }}>
            Sign Out
          </button>
        </div>
      );
    } else if (status === 'loading') {
      return <span className='text-[#888] text-sm mt-7'>Loading...</span>;
    } else {
      return (
        <div className='flex flex-col items-center justify-center'>
          <p>
            Become a member today to take advantage of our <strong>amazing deals!</strong> or{' '}
            <Link href='/login' className='underline'>
              Sign In
            </Link>
          </p>
          <Link href='/register' className='text-sm'>
            Become a member <span className='underline'>Register</span>
          </Link>
          <Link href='/login' className='border border-solid border-black rounded my-5 p-1'>
            Sign In
          </Link>
        </div>
      );
    }
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-xl'>Home</h1>
      {showSession()}
    </main>
  );
}
