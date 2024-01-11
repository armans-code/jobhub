import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import sanitizeHtml from 'sanitize-html';

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
        <h3 className='text-xl font-semibold'>{title}</h3>
        {tags.map((tag) => (
          <Badge className='mt-2 w-min' key={tag}>
            {tag}
          </Badge>
        ))}
      </CardHeader>
      <CardContent>
        <div
          className='prose'
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(description),
          }}
        />
        <Avatar className='mt-4' />
        <div className='flex w-full justify-between'>
          <Button>Apply</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
