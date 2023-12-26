import React from 'react';
import prisma from '../../../../../../lib/prisma';

async function CompanyInformation({ id }: { id: string }) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    include: {
      company: true,
    },
  });
  return (
    data && (
      <div>
        <p>Title: {data.title}</p>
        <p>Description: {data.description}</p>
        <p>Location: {data.location}</p>
        <p>Salary: {data.salary}</p>
        <p>Company: {data.company.name}</p>
      </div>
    )
  );
}

export default CompanyInformation;
