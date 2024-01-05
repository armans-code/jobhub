'use server';
import { JobType, Tag } from '@prisma/client';
import prisma from '../../lib/prisma';
import sanitizeHtml from 'sanitize-html';
import {
  EducationSection,
  JobSection,
} from './(pages)/(landing)/jobs/[id]/apply/page';

export type CreateApplicantBody = {
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    resumeLink: string;
    pfpLink: string;
    jobId: string;
  };
  jobSections: JobSection[];
  educationSections: EducationSection[];
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
  const applicant = await prisma.applicant.create({ data: body.applicant });
  const educations = await prisma.education.createMany({
    data: body.educationSections.map((section) => ({
      ...section,
      applicantId: applicant.id,
    })),
  });
  const jobs = await prisma.workExperience.createMany({
    data: body.jobSections.map((section) => ({
      ...section,
      applicantId: applicant.id,
    })),
  });
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

export async function editJob(id: string, body: CreateJobBody) {
  const { selectedTags, ...rest } = body;
  const cleanDescription = sanitizeHtml(rest.description);
  const jobBody = { ...rest, description: cleanDescription };
  const job = await prisma.job.update({
    where: { id },
    data: jobBody,
  });

  const createNewJobTags = async () => {
    selectedTags.forEach(async (tag) => {
      const jobTagExists = await prisma.jobTag.findFirst({
        where: { jobId: job.id, tagId: tag.id },
      });
      if (!jobTagExists) {
        await prisma.jobTag.create({
          data: { jobId: job.id, tagId: tag.id },
        });
      }
    });
  };

  const deleteStaleJobTags = async () => {
    const allJobTags = await prisma.jobTag.findMany({
      where: { jobId: job.id },
    });
    allJobTags.forEach(async (jobTag) => {
      const tagExists = selectedTags.find((tag) => tag.id === jobTag.tagId);
      if (!tagExists) {
        await prisma.jobTag.delete({ where: { id: jobTag.id } });
      }
    });
  };

  await createNewJobTags();
  await deleteStaleJobTags();

  return job;
}

export async function getOtherApplications({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  const applicants = await prisma.applicant.findMany({
    where: { email, id: { not: id } },
    include: { job: true },
  });
  return applicants;
}

export async function rejectApplicant(id: string) {
  const applicant = await prisma.applicant.delete({
    where: { id },
  });
  return applicant;
}
