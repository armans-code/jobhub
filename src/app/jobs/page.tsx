import { headers } from 'next/headers';

const fetchData = async () => {
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/job`);
  return res.json();
};

export default async function page() {
  const jobs = await fetchData();
  console.log(jobs);
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
