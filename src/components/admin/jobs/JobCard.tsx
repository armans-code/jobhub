'use client';
import { Prisma, Tag } from '@prisma/client';
import React, { useEffect, useRef } from 'react';
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
import sanitizeHtml from 'sanitize-html';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import EditJobDialogContent from './EditJobDialogContent';

function JobCard({
  job,
  allTags,
}: {
  job: Prisma.JobGetPayload<{
    include: { applicants: true; JobTag: { include: { tag: true } } };
  }>;
  allTags: Tag[];
}) {
  const router = useRouter();
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const applicants = job.applicants.length;
  const jobType = convertJobTypeToString(job.type);

  const handleDeleteCard = async () => {
    await deleteJob(job.id);
    router.refresh();
  };

  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    if (textContainer) {
      const isOverflowing =
        textContainer.scrollHeight > textContainer.clientHeight;

      setShowMoreButton(isOverflowing);
    }
  }, [job.description]);

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
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onSelect={(e) => e.preventDefault()}
                  >
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className='min-w-[85%] p-0 pt-10 pr-5'>
                  <EditJobDialogContent job={job} allTags={allTags} />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuItem
                    className='!text-red-600 cursor-pointer'
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete
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
        <div
          ref={textContainerRef}
          className={`prose ${
            showFullDescription
              ? ''
              : `max-h-64 overflow-hidden ${
                  showMoreButton && 'gradient-mask-b-0'
                }`
          }`}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
        />

        {showMoreButton && (
          <Button
            variant={'link'}
            className=' p-0'
            onClick={() => setShowFullDescription((curr) => !curr)}
          >
            {showFullDescription ? <p>Show Less</p> : <p>Show More</p>}
          </Button>
        )}
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
