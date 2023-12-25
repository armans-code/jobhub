'use server'
import Link from 'next/link';

const fetchData = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/api/company`, {
    next: {
      tags: ['companies'],
    },
  });
  return res.json();
};

export default async function Home() {
  const companies = await fetchData();
  return (
    <div className='flex flex-col gap-8'>
      {companies?.map((company: any) => (
        <div key={company.id}>
          <h1>{company.name}</h1>
          <p>{company.slogan}</p>
          <Link href={`/company/${company.id}`} className='border'>
            view jobs
          </Link>
        </div>
      ))}
    </div>
  );
}
