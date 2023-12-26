'use client';
import React from 'react';
import ApplyForm from './ApplyForm';

function JobPage({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div>
      {children}

      <ApplyForm id={id} />
    </div>
  );
}

export default JobPage;
