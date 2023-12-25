import { headers } from 'next/headers';
import Link from 'next/link';

const fetchData = async (id: string) => {
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/company/${id}`);
  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const company = await fetchData(params.id);
  const { jobs } = company;
  return (
    <div>
      <h1 className='text-2xl mb-12'>{company.name}</h1>
      <Link href={`/company/${params.id}/create-job`} className='border'>
        Create Job
      </Link>
      <div className='flex flex-col mt-4 gap-8'>
        {jobs.map((job: any) => (
          <div key={job.id}>
            <h1 className='text-lg'>{job.title}</h1>
            <p>{job.description}</p>
            <Link href={`/jobs/${job.id}`} className='border'>
              Apply
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
