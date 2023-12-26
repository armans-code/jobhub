import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '../../../../lib/prisma';

async function ApplicantsTable() {
  const applicants = await prisma.applicant.findMany({
    include: { job: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='max-w-[150px]'>Name</TableHead>
          <TableHead className='hidden md:table-cell'>Email</TableHead>
          <TableHead className='hidden md:table-cell'>Applied For</TableHead>
          <TableHead className='hidden md:table-cell text-right'>
            Date Applied
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants.map((applicant) => (
          <TableRow key={applicant.id}>
            <TableCell className='font-medium'>
              {applicant.firstName} {applicant.lastName}
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {applicant.email}
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {applicant.job.title}
            </TableCell>
            <TableCell className='hidden md:table-cell text-right'>
              {applicant.createdAt.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ApplicantsTable;
