'use client';
import { useState } from 'react';
import { createApplicant } from '../../../../../actions';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../../components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card';
import { Label } from '../../../../../../components/ui/label';
import { Input } from '../../../../../../components/ui/input';
import { Textarea } from '../../../../../../components/ui/textarea';
import { Button } from '../../../../../../components/ui/button';
import { useParams } from 'next/navigation';
import { UploadButton } from '../../../../../../utils/files';
import JobSections from './JobSections';
import Link from 'next/link';

export type JobSection = {
  title: string;
  company: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

const getDefaultJobSection = () => {
  return {
    title: '',
    company: '',
    location: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  };
};

export type EducationSection = {
  school: string;
  degree: string;
  gpa: number;
  startYear: number;
  endYear: number;
};

const getInitialEducationSection = () => {
  return {
    school: '',
    degree: '',
    gpa: 0,
    startYear: 0,
    endYear: 0,
  };
};

const Page = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [pfpLink, setPfpLink] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const [jobs, setJobs] = useState<JobSection[]>([getDefaultJobSection()]);
  const [educations, setEducations] = useState<EducationSection[]>([
    getInitialEducationSection(),
  ]);

  const handleSubmit = async () => {
    const applicant = {
      applicant: {
        firstName,
        lastName,
        email,
        phone,
        location,
        summary,
        pfpLink,
        resumeLink,
        jobId: id,
      },
      jobSections: jobs,
      educationSections: educations,
    };
    await createApplicant(applicant)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  console.log(jobs);

  return (
    <div className='px-32 flex flex-col gap-4 py-4'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-3xl font-bold'>Application Form</h1>
        <div className='flex gap-3'>
          <Link href={`/jobs/${id}`}>
            <Button variant={'outline'}>Cancel</Button>
          </Link>
          <Button onClick={() => handleSubmit()}>Submit Application</Button>
        </div>
      </div>
      <Tabs
        // onValueChange={() => setViewOthers(false)}
        defaultValue='personal'
        className='w-full'
      >
        <TabsList className={`grid w-full grid-cols-3`}>
          <TabsTrigger value='personal'>Personal Information</TabsTrigger>
          <TabsTrigger value='work'>Work</TabsTrigger>
          <TabsTrigger value='education'>Education</TabsTrigger>
        </TabsList>
        <TabsContent value='personal'>
          <Card
            className='
            py-4
            '
          >
            <CardContent className='space-y-2'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='johndoe@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>First Name</Label>
                <Input
                  id='location'
                  placeholder='John'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Last Name</Label>
                <Input
                  id='location'
                  placeholder='Doe, FL'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Phone Number</Label>
                <Input
                  id='location'
                  placeholder='(555) 555-5555'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  placeholder='Miami, FL'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='summary'>Summary</Label>
                <Textarea
                  className='min-h-[100px]'
                  id='summary'
                  placeholder='Enter a brief summary about yourself'
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='resume'>Resume</Label>
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(files) => {
                    setResumeLink(files[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`Couldn't upload file: ${error.message}`);
                  }}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='profile-picture'>Profile Picture</Label>
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(files) => {
                    setPfpLink(files[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`Couldn't upload file: ${error.message}`);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='work'>
          <Card className='space-y-6 p-16'>
            <div className='max-w-2xl mx-auto'>
              <JobSections jobs={jobs} setJobs={setJobs} />
              <Button
                onClick={() => {
                  setJobs((jobs) => [...jobs, getDefaultJobSection()]);
                }}
                className='w-full mt-4'
                variant='outline'
              >
                Add another job
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value='education'>
          <Card className='space-y-6 p-16'>
            <div className='max-w-2xl mx-auto'>
              {educations.map((education, index) => (
                <Card className='mt-2' key={index}>
                  <CardHeader className='w-full flex flex-row items-center'>
                    <CardTitle>Education {index + 1}</CardTitle>
                    <Button
                      onClick={() => {
                        const newEducations = [...educations];
                        newEducations.splice(index, 1);
                        setEducations(newEducations);
                      }}
                      className='ml-auto'
                      variant='outline'
                    >
                      Delete
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='school1'>School</Label>
                      <Input
                        value={educations[index].school}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].school = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='school1'
                        placeholder='Enter school name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='degree1'>Degree</Label>
                      <Input
                        value={educations[index].degree}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].degree = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='degree1'
                        placeholder='Enter your degree'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='gpa1'>GPA</Label>
                      <Input
                        value={educations[index].gpa}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].gpa = +e.target.value;
                          setEducations(newEducations);
                        }}
                        id='gpa1'
                        type='number'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='startDate1'>Start Year</Label>
                      <Input
                        value={educations[index].startYear}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].startYear = +e.target.value;
                          setEducations(newEducations);
                        }}
                        id='startDate1'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='endDate1'>End Date</Label>
                      <Input
                        value={educations[index].endYear}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].endYear = +e.target.value;
                          setEducations(newEducations);
                        }}
                        id='endDate1'
                        type='number'
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() => {
                  setEducations((educations) => [
                    ...educations,
                    getInitialEducationSection(),
                  ]);
                }}
                className='w-full mt-4'
                variant='outline'
              >
                Add another education section
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
