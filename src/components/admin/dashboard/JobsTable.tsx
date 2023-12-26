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

async function JobPositionsTable() {
  const jobs = await prisma.job.findMany({
    include: { applicants: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='max-w-[150px]'>Position</TableHead>
          <TableHead className='md:table-cell'>Location</TableHead>
          <TableHead className='md:table-cell'>Vacancies</TableHead>
          <TableHead className='md:table-cell text-right'>Applicants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className='font-medium'>{job.title}</TableCell>
            <TableCell className='hidden md:table-cell'>
              {job.location}
            </TableCell>
            <TableCell>{job.vacancies}</TableCell>
            <TableCell className='text-right'>
              {job.applicants.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default JobPositionsTable;
