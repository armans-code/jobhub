<<<<<<< Updated upstream
const fetchData = async () => {
  const res = await fetch(`http://localhost:3000/api/job`, {
    cache: 'default',
  });
=======
'use server';

const fetchData = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/api/job`);
>>>>>>> Stashed changes
  return res.json();
};

export default async function Page() {
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
