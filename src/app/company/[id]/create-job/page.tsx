'use client';
import React, { useState } from 'react';
import { createJob } from '../../../actions';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { Label } from '../../../../components/ui/label';

const Page = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const job = await createJob({
      title,
      description,
      location,
      salary: +salary,
      companyId: params.id,
    });
    console.log(job);
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Create Job Position</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <Label htmlFor='title' className='block font-medium mb-2'>
            Title
          </Label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='description' className='block font-medium mb-2'>
            Description
          </Label>
          <Textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='location' className='block font-medium mb-2'>
            Location
          </Label>
          <Input
            type='text'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='salary' className='block font-medium mb-2'>
            Salary
          </Label>
          <Input
            type='text'
            id='salary'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full'
          />
        </div>
        <Button
          type='submit'
          // className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default Page;
