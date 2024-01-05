import React from 'react';
import { EducationSection } from './page';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card';
import { Button } from '../../../../../../components/ui/button';
import { Label } from '../../../../../../components/ui/label';
import { Input } from '../../../../../../components/ui/input';

function EducationSections({
  educations,
  setEducations,
}: {
  educations: EducationSection[];
  setEducations: React.Dispatch<React.SetStateAction<EducationSection[]>>;
}) {
  return (
    <div>
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
              <Label htmlFor='degree1'>Major</Label>
              <Input
                value={educations[index].major}
                onChange={(e) => {
                  const newEducations = [...educations];
                  newEducations[index].major = e.target.value;
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
    </div>
  );
}

export default EducationSections;
