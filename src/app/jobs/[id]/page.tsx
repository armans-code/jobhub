import CompanyInformation from './CompanyInformation';
import JobPage from './JobPage';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <JobPage id={params.id}>
        <CompanyInformation id={params.id} />
      </JobPage>
    </div>
  );
}
