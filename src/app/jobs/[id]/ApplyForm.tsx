'use client';
import React, { useState } from 'react';
import { createApplicant } from '../../actions';

const ApplyForm = ({ id }: { id: string }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    const applicant = await createApplicant({
      firstName,
      lastName,
      email,
      phone,
      jobId: id,
    });
    console.log(applicant);
  };

  return (
    <div>
      <input
        type='text'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
        placeholder='First Name'
      />
      <input
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
        placeholder='Last Name'
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
        placeholder='Email'
      />
      <input
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
        placeholder='Phone'
      />
      <button
        type='submit'
        onClick={handleSubmit}
        className='bg-blue-500 text-white py-2 px-4 rounded-md'
      >
        Submit
      </button>
    </div>
  );
};

export default ApplyForm;
