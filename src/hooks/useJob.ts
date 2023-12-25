'use client';
import useSWR from 'swr';

const useJob = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/job/${id}`);

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};

export default useJob;
