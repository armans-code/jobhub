import Link from 'next/link';
import { Badge } from '../../../components/ui/badge';
import JobCard from '../../../components/landing/job-card';
import prisma from '../../../../lib/prisma';

export default async function Home() {
  const featuredJobs = await prisma.job.findMany({
    take: 3,
  });

  return (
    <main className='w-full py-12 space-y-12'>
      <section className='container mx-auto px-4 md:px-6'>
        <h2 className='text-3xl font-semibold mb-4'>Find your perfect job</h2>
        <p className='text-md text-gray-600 mb-6'>
          We connect job seekers with new experiences. Start your job search
          with ABC Company today.
        </p>
      </section>
      <section className='container mx-auto px-4 md:px-6'>
        <h2 className='text-3xl font-semibold mb-6'>Categories</h2>
        <div className='grid grid-flow-col auto-cols-max gap-6'>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Technology
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Marketing
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Finance
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Healthcare
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Education
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Other
            </Badge>
          </Link>
        </div>
      </section>
      <section className='container mx-auto px-4 md:px-6'>
        <h2 className='text-3xl font-semibold mb-6'>Featured Jobs</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              company='ABC Company'
              tags={['Technology']}
            />
          ))}
        </div>
      </section>
      {/* <section className='container mx-auto px-4 md:px-6 mt-12'>
        <h2 className='text-3xl font-semibold mb-6'>Job Categories</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Technology
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Marketing
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Finance
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Healthcare
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Education
            </Badge>
          </Link>
          <Link href='#'>
            <Badge
              className='hover:bg-gray-100 dark:hover:bg-gray-800'
              variant='outline'
            >
              Others
            </Badge>
          </Link>
        </div>
      </section> */}
    </main>
  );
}
