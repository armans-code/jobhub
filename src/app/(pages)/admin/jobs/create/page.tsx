import React from 'react';
import prisma from '../../../../../../lib/prisma';
import EditJobForm from '../../../../../components/admin/jobs/EditJobForm';

async function Page() {
  const allTags = await prisma.tag.findMany();
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <h1 className='font-semibold text-lg md:text-2xl'>Create Job</h1>
      <EditJobForm allTags={allTags} />
    </div>
  );
}

export default Page;
