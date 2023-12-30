'use client';
import React from 'react';
import { Prisma } from '@prisma/client';
import ApplicantCard from '../../../../components/admin/applicants/ApplicantCard';
import SelectedApplicant from '../../../../components/admin/applicants/SelectedApplicant';

function ApplicantPage({
  applicants,
}: {
  applicants: Prisma.ApplicantGetPayload<{ include: { job: true } }>[];
}) {
  const [selectedApplicant, setSelectedApplicant] = React.useState<
    Prisma.ApplicantGetPayload<{ include: { job: true } }>
  >(applicants[0]);
  return (
    <div className='w-full h-full flex flex-col md:flex-row gap-6'>
      <div className='w-full md:w-1/3 h-full overflow-y-auto'>
        <ul className='flex flex-col gap-3'>
          {applicants?.map((applicant) => (
            <li
              key={applicant.id}
              onClick={() => setSelectedApplicant(applicant)}
            >
              <ApplicantCard
                applicant={applicant}
                selected={applicant.id === selectedApplicant.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <SelectedApplicant applicant={selectedApplicant} />
    </div>
  );
}

export default ApplicantPage;
