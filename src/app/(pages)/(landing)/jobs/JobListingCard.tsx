'use client';
import { Prisma, Tag } from '@prisma/client';
import React, { useEffect, useRef } from 'react';
import { convertJobTypeToString } from '../../../../utils/job-type';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import sanitizeHtml from 'sanitize-html';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../components/ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

function JobListingCard({
  job,
  allTags,
}: {
  job: Prisma.JobGetPayload<{
    include: { applicants: true; JobTag: { include: { tag: true } } };
  }>;
  allTags: Tag[];
}) {
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const applicants = job.applicants.length;
  const jobType = convertJobTypeToString(job.type);

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
          {job.archived ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'outline'} disabled>
                    Archived
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  This job opening has been archived.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link href={`/jobs/${job.id}`}>
              <Button>More Information</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default JobListingCard;
