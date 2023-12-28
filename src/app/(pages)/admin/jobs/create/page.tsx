import React from 'react';
import CreateJobForm from './CreateJobForm';
import prisma from '../../../../../../lib/prisma';

async function Page() {
  const tags = await prisma.tag.findMany();
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <h1 className='font-semibold text-lg md:text-2xl'>Create Job</h1>
      <CreateJobForm tags={tags} />
    </div>
  );
}

export default Page;
