import React from 'react';
import { Card } from '../../ui/card';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

function OtherApplicationCard({
  application,
}: {
  application: Prisma.ApplicantGetPayload<{ include: { job: true } }>;
}) {
  return (
    <Card
      className={`flex cursor-pointer hover:bg-gray-50 items-center justify-between p-2`}
    >
      <div>
        <h3 className='font-bold'>{application.job.title}</h3>
        <p className='text-gray-500 text-sm dark:text-gray-400'>
          Applied {DateTime.fromJSDate(application.createdAt).toRelative()}
        </p>
      </div>
    </Card>
  );
}

export default OtherApplicationCard;
