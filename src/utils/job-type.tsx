import { JobType } from '@prisma/client';

export function convertJobTypeToString(jobType: JobType): string {
  return jobType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getJobTypes() {
  return [
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
}
