import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

type JobCardProps = {
  title: string;
  description: string;
  company: string;
  tags: string[];
};

const JobCard = (props: JobCardProps) => {
  const { title, description, company, tags } = props;
  return (
    <Card>
      <CardHeader>
        <h3 className='text-2xl font-bold'>{title}</h3>
        {tags.map((tag) => (
          <Badge className='mt-2 w-min' key={tag}>
            {tag}
          </Badge>
        ))}
      </CardHeader>
      <CardContent>
        <p className='text-gray-600'>{description}</p>
        <Avatar className='mt-4' />
        <div className='flex w-full justify-between'>
          <p className='text-gray-600 mt-2'>{company}</p>
          <Button>Apply</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
