import React from 'react';
import prisma from '../../../../../../lib/prisma';

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const job = await prisma.job.findUnique({ where: { id } });
  return (
    job && (
      <div>
        <h1>{job.title}</h1>
        <p>{job.location}</p>
        <p>{job.type}</p>
      </div>
    )
  );
}

export default Page;
