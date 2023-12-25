'use client';
import React, { use, useState } from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = JSON.stringify({
      title,
      description,
      location,
      salary,
      companyId: params.id,
    });
    fetch('/api/job', {
      method: 'POST',
      body,
    });
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Create Job Position</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium mb-2'>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block font-medium mb-2'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='location' className='block font-medium mb-2'>
            Location
          </label>
          <input
            type='text'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='salary' className='block font-medium mb-2'>
            Salary
          </label>
          <input
            type='text'
            id='salary'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default Page;
