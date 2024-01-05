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

export type JobSection = {
  company?: string;
  location?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type Education = {
  school?: string;
  location?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

const Page = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [jobs, setJobs] = useState<JobSection[]>([{}]);
  const [educations, setEducations] = useState<Education[]>([{}]);

  const handleSubmit = async () => {
    const applicant = await createApplicant({
      firstName,
      lastName,
      email,
      phone,
      jobId: id,
    });
  };

  return (
    <div className='px-32 flex flex-col gap-4 py-4'>
      <h1 className='text-3xl font-bold'>Application Form</h1>
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
                <Input id='email' placeholder='johndoe@example.com' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>First Name</Label>
                <Input id='location' placeholder='John' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Last Name</Label>
                <Input id='location' placeholder='Doe, FL' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Phone Number</Label>
                <Input id='location' placeholder='(813) 555-9632' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input id='location' placeholder='Miami, FL' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='summary'>Summary</Label>
                <Textarea
                  className='min-h-[100px]'
                  id='summary'
                  placeholder='Enter a brief summary about yourself'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='resume'>Resume</Label>
                <Input id='resume' required type='file' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='profile-picture'>Profile Picture</Label>
                <Input id='profile-picture' required type='file' />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='work'>
          <Card className='space-y-6 p-16'>
            <div className='max-w-2xl mx-auto'>
              {jobs.map((job, index) => (
                <Card className='mt-2' key={index}>
                  <CardHeader className='w-full flex flex-row items-center'>
                    <CardTitle>Job {index + 1}</CardTitle>
                    <Button
                      onClick={() => {
                        const newJobs = [...jobs];
                        newJobs.splice(index, 1);
                        setJobs(newJobs);
                      }}
                      className='ml-auto'
                      variant='outline'
                    >
                      Delete
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='company1'>Company</Label>
                      <Input
                        value={jobs[index].company}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].company = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='company1'
                        placeholder='Enter company name'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='location1'>Location</Label>
                      <Input
                        value={jobs[index].location}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].location = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='location1'
                        placeholder='Enter location'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='role1'>Role</Label>
                      <Input
                        value={jobs[index].role}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].role = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='role1'
                        placeholder='Enter your role'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='startDate1'>Start Date</Label>
                      <Input
                        value={jobs[index].startDate}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].startDate = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='startDate1'
                        type='date'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='endDate1'>End Date</Label>
                      <Input
                        value={jobs[index].endDate}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].endDate = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='endDate1'
                        type='date'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='description1'>Job Description</Label>
                      <Textarea
                        value={jobs[index].description}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].description = e.target.value;
                          setJobs(newJobs);
                        }}
                        id='description1'
                        placeholder='Describe your role'
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() => {
                  setJobs((jobs) => [...jobs, {}]);
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
                      <Label htmlFor='location1'>Location</Label>
                      <Input
                        value={educations[index].location}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].location = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='location1'
                        placeholder='Enter location'
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
                      <Label htmlFor='startDate1'>Start Date</Label>
                      <Input
                        value={educations[index].startDate}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].startDate = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='startDate1'
                        type='date'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='endDate1'>End Date</Label>
                      <Input
                        value={educations[index].endDate}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].endDate = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='endDate1'
                        type='date'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='description1'>
                        Education Description
                      </Label>
                      <Textarea
                        value={educations[index].description}
                        onChange={(e) => {
                          const newEducations = [...educations];
                          newEducations[index].description = e.target.value;
                          setEducations(newEducations);
                        }}
                        id='description1'
                        placeholder='Describe your education'
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() => {
                  setEducations((educations) => [...educations, {}]);
                }}
                className='w-full mt-4'
                variant='outline'
              >
                Add another education
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
