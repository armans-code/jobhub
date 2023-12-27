import { JobType } from '@prisma/client';

export function convertJobTypeToString(jobType: JobType): string {
  return jobType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
