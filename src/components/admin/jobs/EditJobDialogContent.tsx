import React from 'react';
import { ScrollArea } from '../../ui/scroll-area';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import EditJobForm from './EditJobForm';

import { Prisma, Tag } from '@prisma/client';

function EditJobDialogContent({
  job,
  allTags,
}: {
  job: Prisma.JobGetPayload<{
    include: { applicants: true; JobTag: { include: { tag: true } } };
  }>;
  allTags: Tag[];
}) {
  return (
    <ScrollArea className='max-h-[36rem]'>
      <div className='px-8 pb-4'>
        <DialogHeader>
          <DialogTitle>Edit Job Opening</DialogTitle>
          <DialogDescription>
            Make changes to the job opening here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-8'>
          <EditJobForm currentJob={job} allTags={allTags} />
        </div>
      </div>
    </ScrollArea>
  );
}

export default EditJobDialogContent;
