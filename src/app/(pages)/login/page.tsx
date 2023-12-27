'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Database } from '../../../../lib/database.types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  //   const handleSignOut = async () => {
  //     await supabase.auth.signOut();
  //     router.refresh();
  //   };

  //   const handleSignUp = async () => {
  //     await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: `${location.origin}/auth/callback`,
  //       },
  //     });
  //     router.refresh();
  //   };

  const handleSignIn = async () => {
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(() => {
        router.push('/admin');
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded px-8 py-6'>
        <input
          className='mb-4 py-2 px-3 border rounded'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Email'
        />
        <input
          className='mb-4 py-2 px-3 border rounded'
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='Password'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
