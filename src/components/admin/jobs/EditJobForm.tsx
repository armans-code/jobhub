'use client';
import { JobType, Prisma, Tag } from '@prisma/client';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { InputIcon } from '../../ui/input-icon';
import { Checkbox } from '../../ui/checkbox';
import { ToggleBadge } from '../../ui/toggle-badge';
import Tiptap from './Tiptap';
import JobTypeSelector from './JobTypeSelector';
import { Button } from '../../ui/button';
import { createJob, editJob } from '../../../app/actions';
import { useRouter } from 'next/navigation';
import { DialogClose } from '../../ui/dialog';

function EditJobForm({
  currentJob,
  allTags,
}: {
  currentJob?: Prisma.JobGetPayload<{
    include: { applicants: true; JobTag: { include: { tag: true } } };
  }>;
  allTags: Tag[];
}) {
  const router = useRouter();

  const initialFormData = {
    title: currentJob?.title || '',
    location: currentJob?.location || '',
    salary: currentJob?.salary || 130000,
    type: currentJob?.type || JobType.FULL_TIME,
    vacancies: currentJob?.vacancies || 1,
    collectResume: currentJob?.collectResume || false,
    requireResume: currentJob?.requireResume || false,
    selectedTags: currentJob?.JobTag.map((jobTag) => jobTag.tag) || [],
  };

  const [title, setTitle] = useState<string>(initialFormData.title);
  const [location, setLocation] = useState<string>(initialFormData.location);
  const [salary, setSalary] = useState<number>(initialFormData.salary);
  const [type, setType] = useState<JobType>(initialFormData.type);
  const [vacancies, setVacancies] = useState<number>(initialFormData.vacancies);
  const [collectResume, setCollectResume] = useState<boolean>(
    initialFormData.collectResume,
  );
  const [requireResume, setRequireResume] = useState<boolean>(
    initialFormData.requireResume,
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialFormData.selectedTags,
  );

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

  const handleSubmit = async (archived: boolean) => {
    const body = {
      title,
      location,
      salary,
      type,
      vacancies,
      collectResume,
      requireResume,
      selectedTags,
      description: editor?.getHTML() || '',
      archived,
    };
    if (currentJob) {
      await editJob(currentJob.id, body);
    } else {
      await createJob(body);
    }
    router.push('/admin/jobs');
    router.refresh();
  };

  return (
    <div className='flex flex-col gap-8 w-full'>
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
        <JobTypeSelector type={type} setType={setType} />
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
        {allTags.map((tag) => (
          <ToggleBadge
            key={tag.id}
            className='w-min'
            pressed={selectedTags.some((t) => t.id === tag.id)}
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
      {currentJob ? (
        <DialogClose className='flex items-center justify-end gap-3'>
          <Button variant={'outline'} onClick={() => handleSubmit(true)}>
            Archive
          </Button>
          <Button onClick={() => handleSubmit(false)}>Save Changes</Button>
        </DialogClose>
      ) : (
        <div className='flex items-center justify-end gap-3'>
          <Button variant={'outline'} onClick={() => handleSubmit(true)}>
            Archive
          </Button>
          <Button onClick={() => handleSubmit(false)}>Create</Button>
        </div>
      )}
    </div>
  );
}

export default EditJobForm;
