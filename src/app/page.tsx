import { headers } from 'next/headers';
import Link from 'next/link';

const fetchData = async () => {
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/company`);
  return res.json();
};

export default async function Home() {
  const companies = await fetchData();
  console.log(companies);
  return (
    <div className='flex flex-col gap-8'>
      {companies.map((company: any) => (
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
