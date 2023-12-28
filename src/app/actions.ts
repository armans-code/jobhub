'use server';
import { JobType, Tag } from '@prisma/client';
import prisma from '../../lib/prisma';
import sanitizeHtml from 'sanitize-html';

export type CreateApplicantBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobId: string;
};

export type CreateJobBody = {
  title: string;
  description: string;
  location: string;
  salary: number;
  selectedTags: Tag[];
  type: JobType;
  vacancies: number;
  collectResume: boolean;
  requireResume: boolean;
  archived: boolean;
};

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
  supabase_id: string;
};

export async function createApplicant(body: CreateApplicantBody) {
  const applicant = await prisma.applicant.create({ data: body });
  return applicant;
}

export async function deleteJob(id: string) {
  const job = await prisma.job.delete({
    where: { id },
    include: { applicants: true, JobTag: true },
  });
  return job;
}

export async function createJob(body: CreateJobBody) {
  const { selectedTags, ...rest } = body;
  const cleanDescription = sanitizeHtml(rest.description);
  const jobBody = { ...rest, description: cleanDescription };
  const job = await prisma.job.create({ data: jobBody });
  selectedTags.forEach(async (tag) => {
    await prisma.jobTag.create({
      data: { jobId: job.id, tagId: tag.id },
    });
  });
  return job;
}
