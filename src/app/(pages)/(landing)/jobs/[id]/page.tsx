import prisma from '../../../../../../lib/prisma';
import sanitizeHtml from 'sanitize-html';
import { convertJobTypeToString } from '../../../../../utils/job-type';
import { Badge } from '../../../../../components/ui/badge';
import {
  ArrowLeftIcon,
  ClockIcon,
  DollarSignIcon,
  FileIcon,
  GroupIcon,
  MapPinIcon,
  UsersIcon,
} from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import Head from 'next/head';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
    include: { applicants: true },
  });

  const tags = await prisma.jobTag.findMany({
    where: {
      jobId: id,
    },
    include: {
      tag: true,
    },
  });

  return (
    job && (
      <div className='p-6 md:p-12'>
        <Head>
          <title>{job.title}</title>
        </Head>
        <div className='max-w-5xl mx-auto'>
          <Link href={`/jobs/`}>
            <Button
              variant='outline'
              className='mb-4 flex items-center justify-between px-2 gap-2'
            >
              <ArrowLeftIcon className='p-0' />
              <p>View all jobs</p>
            </Button>
          </Link>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
            <Link href={`/jobs/${job.id}/apply`}>
              <Button variant='default'>Apply Now</Button>
            </Link>
          </div>
          {tags.map((tag) => (
            <Badge className='mr-2 mb-2' key={tag.id}>
              {tag.tag.name}
            </Badge>
          ))}
          <div className='grid grid-flow-col mt-2 mb-4'>
            <div className='flex items-center space-x-2'>
              <MapPinIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                {job.location}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <UsersIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                {job.vacancies} Openings
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <DollarSignIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                {job.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /
                year
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <ClockIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                {convertJobTypeToString(job.type)}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <FileIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                Resume{' '}
                {job.collectResume
                  ? job.requireResume
                    ? 'Required'
                    : 'Optional'
                  : 'Not Collected'}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <GroupIcon className='h-6 w-6' />
              <span className='text-gray-500 dark:text-gray-400'>
                {job.applicants.length} Applicants
              </span>
            </div>
          </div>
          <div
            className='prose'
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(job.description),
            }}
          />
        </div>
      </div>
    )
  );
}
