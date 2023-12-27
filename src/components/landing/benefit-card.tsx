import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

type BenefitCardProps = {
  title: string;
  description: string;
};

const BenefitCard = (props: BenefitCardProps) => {
  const { title, description } = props;
  return (
    <Card>
      <CardHeader>
        <h3 className='text-xl font-semibold'>{title}</h3>
      </CardHeader>
      <CardContent>
        <p className='text-gray-600 text-sm'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
