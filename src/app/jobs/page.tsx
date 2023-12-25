const fetchData = async () => {
  const res = await fetch(`http://localhost:3000/api/job`, {
    cache: 'default',
  });
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
