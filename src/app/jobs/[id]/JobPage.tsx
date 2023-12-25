'use client';
import React from 'react';
import ApplyForm from './ApplyForm';
import useJob from '../../../hooks/useJob';

function JobPage({ children, id }: { children: React.ReactNode; id: string }) {
  const { data, isLoading } = useJob(id);

  return (
    <div>
      {children}

      <ApplyForm id={id} />

      {isLoading ? (
        <p>Loading applicants...</p>
      ) : (
        data?.applicants.map((applicant: any) => (
          <div key={applicant.id}>
            <p>{applicant.name}</p>
            <p>{applicant.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default JobPage;
