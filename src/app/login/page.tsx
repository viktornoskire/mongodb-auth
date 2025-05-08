'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import React from 'react';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error.toString());
    }
    if (res?.ok) {
      return router.push('/');
    }
  };

  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <form
        className='p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-white rounded'
        onSubmit={handleSubmit}>
        {error && <div className='text-black'>{error}</div>}
        <h1 className='mb-5 w-full text-2xl font-bold text-black'>Sign In</h1>
        <label className='w-full text-sm text-black'>Email</label>
        <input
          type='email'
          placeholder='Email'
          className='w-full h-8 border border-solid border-black rounded p-2 text-black'
          name='email'
        />
        <label className='w-full text-sm text-black'>Password</label>
        <div className='flex w-full'>
          <input
            type='password'
            placeholder='Password'
            className='w-full h-8 border border-solid border-black rounded p-2 text-black'
            name='password'
          />
        </div>
        <button className='w-full border border-solid border-black rounded text-black'>Sign In</button>

        <Link href='/register' className='text-sm text-[#888] transition duration-150 ease hover:text-black'>
          Don't have an account? <span className='underline'>Register</span>
        </Link>
      </form>
    </section>
  );
};

export default Login;
