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
  companyId: string;
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

export async function createJob(body: CreateJobBody) {
  const job = await prisma.job.create({ data: body });
  return job;
}

export async function register(body: RegisterBody) {
  const user = await prisma.company.create({ data: body });
  return user;
}
