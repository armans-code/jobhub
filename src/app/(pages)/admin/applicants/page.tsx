import React from 'react';
import prisma from '../../../../../lib/prisma';
import ApplicantPage from './ApplicantPage';

async function Page() {
  const applicants = await prisma.applicant.findMany({
    include: {
      job: true,
      workExperience: true,
      education: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return <ApplicantPage applicants={applicants} />;
}

export default Page;
