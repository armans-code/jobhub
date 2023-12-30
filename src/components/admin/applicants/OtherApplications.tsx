'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '../../ui/label';
import Link from 'next/link';
import OtherApplicationCard from './OtherApplicationCard';
import { getOtherApplications } from '../../../app/actions';
import { Prisma } from '@prisma/client';

function OtherApplications({ id, email }: { id: string; email: string }) {
  const [otherApplications, setOtherApplications] = useState<
    Prisma.ApplicantGetPayload<{ include: { job: true } }>[]
  >([]);
  useEffect(() => {
    getOtherApplications({ id, email }).then((applications) =>
      setOtherApplications(applications),
    );
  }, [email, id]);
  return (
    otherApplications.length > 0 && (
      <div className='mt-8'>
        <Label>Also applied to:</Label>
        <div className='flex w-full flex-col mt-3 gap-4'>
          {otherApplications.map((application) => (
            <Link
              key={application.id}
              target='_blank'
              rel='noopener noreferrer'
              href={`/admin/applicants/${application.id}`}
            >
              <OtherApplicationCard application={application} />
            </Link>
          ))}
        </div>
      </div>
    )
  );
}

export default OtherApplications;
