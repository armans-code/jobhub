import React from 'react';
import { Card } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { MoreVertical } from 'lucide-react';
import { Button } from '../../ui/button';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

function ApplicantCard({
  selected,
  applicant,
}: {
  selected: boolean;
  applicant: Prisma.ApplicantGetPayload<{ include: { job: true } }>;
}) {
  return (
    <Card
      className={`flex cursor-pointer hover:bg-gray-50 items-center justify-between p-2 ${
        selected && 'bg-gray-100 border'
      }`}
    >
      <div className='flex items-center gap-4'>
        <Avatar>
          <AvatarImage src={applicant.pfpLink} />
          <AvatarFallback>
            {applicant.firstName[0] + applicant.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-bold'>{`${applicant.firstName} ${applicant.lastName}`}</h3>
          <p className='text-gray-500 text-sm dark:text-gray-400'>
            Applied {DateTime.fromJSDate(applicant.createdAt).toRelative()}
          </p>
        </div>
      </div>
      <Button className='p-0 rounded-lg' variant='ghost'>
        <MoreVertical />
      </Button>
    </Card>
  );
}

export default ApplicantCard;
