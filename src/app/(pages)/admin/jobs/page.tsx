import React, { Suspense } from 'react';
import { Button } from '../../../../components/ui/button';
import JobCard from '../../../../components/admin/jobs/JobCard';
import prisma from '../../../../../lib/prisma';
import JobCardSkeleton from '../../../../components/admin/jobs/JobCardSkeleton';
import Link from 'next/link';

async function ShowJobs() {
  const jobs = await prisma.job.findMany({
    include: { applicants: true, JobTag: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}

function Page() {
  return (
    <div className='flex flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
        <div className='flex items-center'>
          <h1 className='font-semibold text-lg md:text-2xl'>Job Openings</h1>
          <Link className='ml-auto' href='/admin/jobs/create'>
            <Button size='sm'>Create Job</Button>
          </Link>
        </div>
        <div className='grid gap-4'>
          <Suspense
            fallback={
              <div>
                <JobCardSkeleton />
                <JobCardSkeleton />
              </div>
            }
          >
            <ShowJobs />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default Page;
