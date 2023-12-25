'use client';
import ApplyForm from '../../../components/ApplyForm';
import useJob from '../../../hooks/useJob';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useJob(params.id);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    data && (
      <div>
        <p>Title: {data.title}</p>
        <p>Description: {data.description}</p>
        <p>Location: {data.location}</p>
        <p>Salary: {data.salary}</p>
        <p>Company: {data.company.name}</p>

        <ApplyForm id={params.id} />
        {data?.applicants.map((applicant: any) => (
          <div key={applicant.id}>
            <p>{applicant.name}</p>
            <p>{applicant.email}</p>
          </div>
        ))}
      </div>
    )
  );
}
