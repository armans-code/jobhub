import React from 'react';
import { JobSection } from './page';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card';
import { Button } from '../../../../../../components/ui/button';
import { Label } from '../../../../../../components/ui/label';
import { Input } from '../../../../../../components/ui/input';
import { Textarea } from '../../../../../../components/ui/textarea';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../../components/ui/popover';
import { cn } from '../../../../../../lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../../../../../components/ui/calendar';

function JobSections({
  jobs,
  setJobs,
}: {
  jobs: JobSection[];
  setJobs: React.Dispatch<React.SetStateAction<JobSection[]>>;
}) {
  return (
    <div>
      {jobs.map((job, index) => (
        <Card className='mt-2' key={index}>
          <CardHeader className='w-full flex flex-row items-center'>
            <CardTitle>Job {index + 1}</CardTitle>
            <Button
              onClick={() => {
                const newJobs = [...jobs];
                newJobs.splice(index, 1);
                setJobs(newJobs);
              }}
              className='ml-auto'
              variant='outline'
            >
              Delete
            </Button>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title1'>Title</Label>
              <Input
                value={jobs[index].title}
                onChange={(e) => {
                  const newJobs = [...jobs];
                  newJobs[index].title = e.target.value;
                  setJobs(newJobs);
                }}
                id='title1'
                placeholder='Enter job title'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='company1'>Company</Label>
              <Input
                value={jobs[index].company}
                onChange={(e) => {
                  const newJobs = [...jobs];
                  newJobs[index].company = e.target.value;
                  setJobs(newJobs);
                }}
                id='company1'
                placeholder='Enter company name'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='location1'>Location</Label>
              <Input
                value={jobs[index].location}
                onChange={(e) => {
                  const newJobs = [...jobs];
                  newJobs[index].location = e.target.value;
                  setJobs(newJobs);
                }}
                id='location1'
                placeholder='Enter location'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description1'>Description</Label>
              <Textarea
                value={jobs[index].description}
                onChange={(e) => {
                  const newJobs = [...jobs];
                  newJobs[index].description = e.target.value;
                  setJobs(newJobs);
                }}
                id='description1'
                placeholder='Enter job description'
              />
            </div>
            <div className='space-y-2 flex flex-col'>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !jobs[index].startDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {jobs[index].startDate ? (
                      format(jobs[index].startDate as Date, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={jobs[index].startDate}
                    onSelect={(date) => {
                      if (date) {
                        const newJobs = [...jobs];
                        newJobs[index].startDate = date;
                        setJobs(newJobs);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='space-y-2 flex flex-col'>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !jobs[index].endDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {jobs[index].endDate ? (
                      format(jobs[index].endDate as Date, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={jobs[index].endDate}
                    onSelect={(date) => {
                      if (date) {
                        const newJobs = [...jobs];
                        newJobs[index].endDate = date;
                        setJobs(newJobs);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default JobSections;
