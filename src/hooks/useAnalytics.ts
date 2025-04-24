
import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/lib/analytics';

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
