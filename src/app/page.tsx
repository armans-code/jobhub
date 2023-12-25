import Link from 'next/link';
import prisma from '../../lib/prisma';

export default async function Home() {
  const companies = await prisma.company.findMany();
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
