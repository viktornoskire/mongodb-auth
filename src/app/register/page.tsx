'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions/register';
import React from 'react';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
    } else {
      return router.push('/login');
    }
  };
  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <form
        ref={ref}
        action={handleSubmit}
        className='p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
            border border-solid border-black bg-white rounded'>
        {error && <div className=''>{error}</div>}
        <h1 className='mb-5 w-full text-2xl font-bold text-black'>Register</h1>

        <label className='w-full text-sm text-black'>Full Name</label>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px] text-black'
          name='name'
        />

        <label className='w-full text-sm text-black'>Email</label>
        <input
          type='email'
          placeholder='Email'
          className='w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-black'
          name='email'
        />

        <label className='w-full text-sm text-black'>Password</label>
        <div className='flex w-full'>
          <input
            type='password'
            placeholder='Password'
            className='w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-black'
            name='password'
          />
        </div>

        <button
          className='w-full border border-solid border-black py-1.5 mt-2.5 rounded
            transition duration-150 ease hover:bg-gray-300 text-black'>
          Sign up
        </button>

        <Link href='/login' className='text-sm text-[#888] transition duration-150 ease hover:text-black'>
          Already have an account? <span className='underline'>Login</span>
        </Link>
      </form>
    </section>
  );
}
