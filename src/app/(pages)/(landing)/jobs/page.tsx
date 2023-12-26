import prisma from '../../../../../lib/prisma';

export default async function page() {
  const jobs = await prisma.job.findMany();
  return (
    <div>
      {jobs?.map((job: any) => (
        <div key={job.id}>
          <h1>{job.title}</h1>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}
