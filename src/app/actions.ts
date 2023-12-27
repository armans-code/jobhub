'use server';

import prisma from '../../lib/prisma';

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
