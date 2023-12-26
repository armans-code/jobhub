import React from 'react';
import JobPositionsTable from '../../../components/admin/dashboard/JobsTable';
import ApplicantsTable from '../../../components/admin/dashboard/ApplicantsTable';

async function Page() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Job Positions</h1>
      </div>
      <div className='border shadow-sm rounded-lg'>
        <JobPositionsTable />
      </div>
      <div className='flex items-center mt-8'>
        <h1 className='font-semibold text-lg md:text-2xl'>Applicants</h1>
      </div>
      <div className='border shadow-sm rounded-lg'>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Page;
