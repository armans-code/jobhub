import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../ui/command';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { getJobTypes } from '../../../utils/job-type';
import { JobType } from '@prisma/client';

function JobTypeSelector({
  type,
  setType,
}: {
  type: string;
  setType: (type: JobType) => void;
}) {
  const [open, setOpen] = useState(false);
  const JOB_TYPES = getJobTypes();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-32 justify-between'
        >
          {type
            ? JOB_TYPES.find((jobType) => jobType.value === type)?.label
            : 'Select job type'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search job type...' className='h-9' />
          <CommandEmpty>No job type found.</CommandEmpty>
          <CommandGroup>
            {JOB_TYPES.map((jobType) => (
              <CommandItem
                key={jobType.value}
                value={jobType.value}
                onSelect={() => {
                  setType(jobType.value);
                  setOpen(false);
                }}
              >
                {jobType.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    type === jobType.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default JobTypeSelector;
