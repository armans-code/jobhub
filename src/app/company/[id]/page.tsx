import Link from 'next/link';

const fetchData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/company/${id}`, {
    cache: 'default',
  });
  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const company = await fetchData(params.id);
  const { jobs } = company;
  return (
    company && (
      <div className='bg-gray-100 min-h-screen'>
        <h1 className='text-2xl mb-12'>{company.name}</h1>
        <Link
          href={`/company/${params.id}/create-job`}
          className='border bg-blue-500 text-white px-4 py-2 rounded'
        >
          Create Job
        </Link>
        <div className='flex flex-col mt-4 gap-8'>
          {jobs.map((job: any) => (
            <div key={job.id} className='bg-white p-4 rounded shadow'>
              <h1 className='text-lg'>{job.title}</h1>
              <p className='my-2'>{job.description}</p>
              <Link
                href={`/jobs/${job.id}`}
                className='border bg-blue-500 text-white px-4 py-2 rounded'
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
