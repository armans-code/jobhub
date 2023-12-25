'use client';
import useSWR from 'swr';

const useCompany = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/company/${id}`);

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};

export default useCompany;
