'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Database } from '../../../lib/database.types';
import { register } from '../actions';

const RegisterPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth
      .signUp({
        email,
        password,
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.user) {
          const supabase_id = res.data.user.id;
          await register({
            name: companyName,
            email,
            supabase_id,
            password,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    router.refresh();
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Register</h1>
      <div className='w-64'>
        <div className='mb-2'>
          Company Name:
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className='border border-gray-300 rounded-md p-2 w-full'
          />
        </div>
        <br />
        <div className='mb-2'>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border border-gray-300 rounded-md p-2 w-full'
          />
        </div>
        <br />
        <div className='mb-2'>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border border-gray-300 rounded-md p-2 w-full'
          />
        </div>
        <br />
        <button
          onClick={handleSignUp}
          className='bg-blue-500 text-white py-2 px-4 rounded-md'
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
