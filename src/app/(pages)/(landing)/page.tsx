import Link from 'next/link';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import JobCard from '../../../components/landing/job-card';

export default async function Home() {
  return (
    <main className='w-full py-12'>
      <section className='container mx-auto px-4 md:px-6 mb-12'>
        <h2 className='text-4xl font-bold mb-4'>Find your perfect job</h2>
        <p className='text-lg text-gray-600 mb-6'>
          We connect job seekers with new experiences. Start your job search
          today.
        </p>
        <div className='flex w-full max-w-lg items-center space-x-2 mb-8'>
          <Input
            placeholder='Search job titles, departments, or keywords'
            type='text'
          />
          <Button type='submit'>Search</Button>
        </div>
      </section>
      <section className='container mx-auto px-4 md:px-6'>
        <h2 className='text-3xl font-bold mb-6'>Featured Jobs</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <JobCard
            title='Frontend Developer'
            description='We are looking for a Frontend Developer to lead our marketing efforts. You will be responsible for creating and implementing marketing strategies.'
            company='ABC Company'
            tags={['Technology']}
          />
          <JobCard
            title='Marketing Manager'
            description='We are looking for a Marketing Manager to lead our marketing efforts. You will be responsible for creating and implementing marketing strategies.'
            company='ABC Company'
            tags={['Marketing']}
          />
        </div>
      </section>
      <section className='container mx-auto px-4 md:px-6 mt-12'>
        <h2 className='text-3xl font-bold mb-6'>Job Categories</h2>
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
      </section>
    </main>
  );
}
