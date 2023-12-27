import React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader } from '../../ui/card';
import { MoreVertical } from 'lucide-react';
import { Button } from '../../ui/button';

function JobCardSkeleton() {
  return (
    <Card className='mb-4'>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-8 w-48' />
            <CardDescription className=''>
              <Skeleton className='h-4 w-52' />
            </CardDescription>
          </div>
          <MoreVertical className='h-6 w-6' />
        </div>
        <div className='flex gap-3 text-xs'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-16' />
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-48' />
        <Skeleton className='h-4 w-64' />
        <div className='flex gap-2'>
          <Button variant={'outline'}>
            <Skeleton className='h-6 w-24' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default JobCardSkeleton;
