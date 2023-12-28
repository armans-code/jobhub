'use client';
import React, { useState } from 'react';
import { Label } from '../../../../../components/ui/label';
import { Input } from '../../../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover';
import { Button } from '../../../../../components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../../../../components/ui/command';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { InputIcon } from '../../../../../components/ui/input-icon';
import Tiptap from '../../../../../components/admin/jobs/Tiptap';
import { Checkbox } from '../../../../../components/ui/checkbox';
import { JobType, Tag } from '@prisma/client';
import { ToggleBadge } from '../../../../../components/ui/toggle-badge';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createJob } from '../../../../actions';

function CreateJobForm({ tags }: { tags: Tag[] }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [salary, setSalary] = useState<number>(130000);
  const [type, setType] = useState<JobType>(JobType.FULL_TIME);
  const [vacancies, setVacancies] = useState<number>(0);
  const [collectResume, setCollectResume] = useState<boolean>(false);
  const [requireResume, setRequireResume] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const JOB_TYPES = [
    {
      value: JobType.FULL_TIME,
      label: 'Full Time',
    },
    {
      value: JobType.PART_TIME,
      label: 'Part Time',
    },
    {
      value: JobType.INTERNSHIP,
      label: 'Internship',
    },
    {
      value: JobType.CONTRACT,
      label: 'Contract',
    },
    {
      value: JobType.TEMPORARY,
      label: 'Temporary',
    },
  ];

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      '<h2>Job Opening</h2><p>Write information about your job opening here! Feel free to use:</p><ul><li><p><strong>Bold</strong></p></li><li><p><em>Italic</em></p></li><li><p><s>Strikethrough</s></p></li></ul><p>And:</p><ol><li><p>Bullet lists</p></li><li><p>Ordered list</p></li></ol>',
    editorProps: {
      attributes: {
        class: 'prose outline-none',
      },
    },
  });

  const handlePost = (archived: boolean) => {
    editor?.getHTML().length &&
      createJob({
        title,
        location,
        salary,
        type,
        vacancies,
        collectResume,
        requireResume,
        selectedTags,
        archived,
        description: editor.getHTML(),
      });
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Label>Position Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Senior Software Engineer'
          className='w-1/5'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Salt Lake City, UT'
          className='w-1/5'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Salary</Label>
        <InputIcon
          value={salary}
          onChange={(e) => setSalary(e.target.valueAsNumber)}
          icon={'$'}
          type='number'
          className='w-32'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Type</Label>
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
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Vacancies</Label>
        <Input
          value={vacancies}
          onChange={(e) => setVacancies(e.target.valueAsNumber)}
          type='number'
          className='w-32'
        />
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='collect-resume'
          checked={collectResume}
          onCheckedChange={() =>
            setCollectResume((collectResume) => !collectResume)
          }
        />
        <label
          htmlFor='collect-resume'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Collect resume from applicant?
        </label>
      </div>
      {collectResume && (
        <div className='flex items-center space-x-2 ml-8'>
          <Checkbox
            id='require-resume'
            checked={requireResume}
            onCheckedChange={() =>
              setRequireResume((requireResume) => !requireResume)
            }
          />
          <label
            htmlFor='require-resume'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Require resume from applicant?
          </label>
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <Label>Tags</Label>
        {tags.map((tag) => (
          <ToggleBadge
            key={tag.id}
            className='w-min'
            onPressedChange={(pressed) => {
              setSelectedTags((selectedTags) =>
                pressed
                  ? [...selectedTags, tag]
                  : selectedTags.filter((t) => t.id !== tag.id),
              );
            }}
          >
            {tag.name}
          </ToggleBadge>
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Description</Label>
        <p className='text-gray-500 text-sm'>
          This is where you should include specific information about the job
          such as responsiblity, values, requirements, etc.
        </p>
        <Tiptap editor={editor} />
      </div>
      <div className='flex items-center gap-3'>
        <Button onClick={() => handlePost(false)}>Post</Button>
        <Button onClick={() => handlePost(true)} variant={'outline'}>
          Add to Archived
        </Button>
      </div>
    </div>
  );
}

export default CreateJobForm;
