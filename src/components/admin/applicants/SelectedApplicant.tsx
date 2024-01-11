import { Prisma } from '@prisma/client';
import React, { Suspense, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Table, TableBody, TableCell, TableRow } from '../../ui/table';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';
import OtherApplications from './OtherApplications';
import { format, intervalToDuration } from 'date-fns';
import { rejectApplicant } from '../../../app/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '../../ui/use-toast';

function SelectedApplicant({
  applicant,
}: {
  applicant: Prisma.ApplicantGetPayload<{
    include: { job: true; workExperience: true; education: true };
  }>;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [viewOthers, setViewOthers] = useState(false);
  useEffect(() => {
    setViewOthers(false);
  }, [applicant]);

  const handleReject = async () => {
    await rejectApplicant(applicant.id).then(() => {
      toast({
        title: 'Rejected applicant.',
        description: 'Deleting applicant from list...',
        duration: 5000,
      });
      router.refresh();
    });
  };
  return (
    <div className='w-full md:w-2/3 h-full flex flex-col gap-6 p-4 rounded border-2'>
      <div className='flex md:flex-row flex-col gap-4 items-center justify-between'>
        <div className='flex gap-4 items-center flex-row'>
          <Avatar className='w-20 h-20 text-2xl'>
            <AvatarImage src={applicant.pfpLink} />
            <AvatarFallback>
              {applicant.firstName[0] + applicant.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>{`${applicant.firstName} ${applicant.lastName}`}</h2>
            <p className='text-sm'>
              Applied {DateTime.fromJSDate(applicant.createdAt).toRelative()}{' '}
              for{' '}
              <Link
                className='underline'
                target='_blank'
                rel='noopener noreferrer'
                href={`/jobs/${applicant.job.id}`}
              >
                {applicant.job.title}
              </Link>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4 md:w-min w-full justify-end'>
          <Button onClick={handleReject} variant={'outline'}>
            Reject
          </Button>
          {/* <Button variant='destructive'>Block</Button> */}
        </div>
      </div>
      <Tabs
        onValueChange={() => setViewOthers(false)}
        defaultValue='overview'
        className='w-full'
      >
        <TabsList className={`flex w-full`}>
          <TabsTrigger className='w-full' value='overview'>
            Overview
          </TabsTrigger>
          <TabsTrigger className='w-full' value='work'>
            Work
          </TabsTrigger>
          <TabsTrigger className='w-full' value='education'>
            Education
          </TabsTrigger>
          {applicant.resumeLink && (
            <TabsTrigger className='w-full' value='resume'>
              Resume
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value='overview'>
          <Card>
            {applicant.summary.length && (
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>{applicant.summary}</CardDescription>
              </CardHeader>
            )}
            <CardContent className='space-y-2'>
              <Table>
                <TableBody>
                  <TableRow className='py-8'>
                    <TableCell className='font-medium text-gray-400'>
                      Email
                    </TableCell>
                    <TableCell className='font-medium'>
                      {applicant.email}
                    </TableCell>
                  </TableRow>
                  <TableRow className='py-8'>
                    <TableCell className='font-medium text-gray-400'>
                      Phone Number
                    </TableCell>
                    <TableCell className='font-medium'>
                      {applicant.phone}
                    </TableCell>
                  </TableRow>
                  <TableRow className='py-8'>
                    <TableCell className='font-medium text-gray-400'>
                      Location
                    </TableCell>
                    <TableCell className='font-medium'>
                      {applicant.location}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {viewOthers && (
                <Suspense fallback={<div>Loading...</div>}>
                  <OtherApplications
                    id={applicant.id}
                    email={applicant.email}
                  />
                </Suspense>
              )}
              <Button
                variant={'link'}
                className=' p-0'
                onClick={() => setViewOthers((curr) => !curr)}
              >
                {viewOthers ? (
                  <p>Hide other applicatins</p>
                ) : (
                  <p>Show other applications</p>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='resume'>
          <Card className='p-0'>
            <CardContent className='space-y-2'>
              <iframe className='w-full h-[500px]' src={applicant.resumeLink} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='work'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              {applicant.workExperience.map((job) => {
                const jobDurationYears = intervalToDuration({
                  start: job.startDate,
                  end: job.endDate,
                }).years;
                const jobDurationMonths = intervalToDuration({
                  start: job.startDate,
                  end: job.endDate,
                }).months;
                const jobDuration =
                  jobDurationYears && jobDurationMonths
                    ? `${jobDurationYears}yrs ${jobDurationMonths}mo`
                    : '';
                return (
                  <div key={job.id}>
                    <div>
                      <Label className='font-bold text-lg'>{job.company}</Label>
                      <p className='text-md font-semibold'>{job.title}</p>
                      <div className='flex items-center gap-2'>
                        <p className='text-sm'>
                          {job.location} | {format(job.startDate, 'LLLL yyyy')}{' '}
                          - {format(job.endDate, 'LLLL yyyy')}
                        </p>
                        <p className='text-xs text-gray-500'>{jobDuration}</p>
                      </div>
                      <p>{job.description}</p>
                    </div>
                    <Separator className='my-4' />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='education'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Education</CardTitle>
            </CardHeader>
            <CardContent>
              {applicant.education.map((school) => (
                <div key={school.id} className='mb-4'>
                  <p className='font-bold text-lg'>{school.school}</p>
                  <p className='text-sm text-gray-400'>
                    {school.startYear} - {school.endYear}
                  </p>
                  <Table>
                    <TableBody>
                      <TableRow className='py-8'>
                        <TableCell className='font-medium text-gray-400'>
                          Degree
                        </TableCell>
                        <TableCell className='font-medium'>
                          {school.degree}
                        </TableCell>
                      </TableRow>
                      <TableRow className='py-8'>
                        <TableCell className='font-medium text-gray-400'>
                          Major
                        </TableCell>
                        <TableCell className='font-medium'>
                          {school.major}
                        </TableCell>
                      </TableRow>
                      <TableRow className='py-8'>
                        <TableCell className='font-medium text-gray-400'>
                          GPA
                        </TableCell>
                        <TableCell className='font-medium'>
                          {school.gpa}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SelectedApplicant;
