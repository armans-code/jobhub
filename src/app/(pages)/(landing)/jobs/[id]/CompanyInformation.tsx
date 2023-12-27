import React from 'react';
import prisma from '../../../../../../lib/prisma';

async function CompanyInformation({ id }: { id: string }) {
  const jobs = await prisma.job.findMany({
    where: {
      id: id,
    },
  });
  return (
    <div>
      <p>our jobs:</p>
      {jobs.map((job) => (
        <div key={job.id}>
          <p>{job.title}</p>
          <p>{job.description}</p>
          <p>{job.location}</p>
          <p>{job.vacancies}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyInformation;
