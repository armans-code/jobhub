'use client';
import { Prisma } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Badge } from '../../ui/badge';
import { convertJobTypeToString } from '../../../utils/job-type';
import { deleteJob } from '../../../app/actions';
import { useRouter } from 'next/navigation';

function JobCard({
  job,
}: {
  job: Prisma.JobGetPayload<{
    include: { applicants: true; JobTag: { include: { tag: true } } };
  }>;
}) {
  const router = useRouter();

  const applicants = job.applicants.length - 1;
  const jobType = convertJobTypeToString(job.type);

  const handleDeleteCard = async () => {
    await deleteJob(job.id);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <CardTitle className='text-xl'>{job.title}</CardTitle>
            <CardDescription className=''>
              {jobType} - {job.location}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='h-min outline-none'>
              <div className='border p-1 rounded-lg hover:bg-gray-100 transition-all'>
                <MoreVertical className='h-6 w-6' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col'>
              <DropdownMenuItem
                className='cursor-pointer'
                onSelect={(e) => e.preventDefault()}
              >
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuItem
                    className='!text-red-600 cursor-pointer'
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete item
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this job opening, including any archived or open
                      applications.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCard()}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex gap-3 text-xs'>
          {job.JobTag.map((tag) => (
            <Badge key={tag.id}>{tag.tag.name}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p>{job.description}</p>
        <div className='flex gap-2'>
          <Button disabled={applicants === 0} variant={'outline'}>
            {applicants === 0
              ? `No Applicants`
              : `View ${applicants} Applicant${applicants > 1 ? 's' : ''}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default JobCard;
