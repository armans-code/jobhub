import prisma from '../../../../../lib/prisma';
import JobListingCard from './JobListingCard';

export default async function page() {
  const jobs = await prisma.job.findMany({
    include: {
      applicants: true,
      JobTag: { include: { job: true, tag: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  const allTags = await prisma.tag.findMany();
  return (
    <div className='p-12 flex flex-col gap-8'>
      {jobs?.map((job: any) => (
        <JobListingCard key={job.id} job={job} allTags={allTags} />
      ))}
    </div>
  );
}
