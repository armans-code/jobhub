import { headers } from 'next/headers';
import ApplyForm from '../../../components/ApplyForm';

const fetchData = async (id: string) => {
  const host = headers().get('host');
  const res = await fetch(`http://${host}/api/job/${id}`);
  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const { title, description, location, salary, company, applicants } =
    await fetchData(params.id);
  return (
    <div>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Location: {location}</p>
      <p>Salary: {salary}</p>
      <p>Company: {company.name}</p>

      <ApplyForm id={params.id} />

      <p>all applicants:</p>
      {applicants.map((applicant: any) => (
        <div key={applicant.id}>
          <p>{applicant.name}</p>
          <p>{applicant.email}</p>
        </div>
      ))}
    </div>
  );
}
