import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Applicants</h2>
      {children}
    </div>
  );
}

export default layout;
