import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useAccount } from "../contexts/accountContext";

interface UseAccountDataOptions<T>
  extends Omit<UseQueryOptions<T>, 'queryFn' | 'queryKey'> {
  queryKey: readonly (string | number)[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  demoData: T;
}

const useAccountData = <T,>({
  queryKey,
  queryFn,
  demoData,
  enabled = true,
  ...options
}: UseAccountDataOptions<T>) => {
  const account = useAccount();

  // use real API query if not in demo
  const query = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !!account?.token && !account.isDemo,
    ...options,
  });

  // If in demo mode, return demo data immediately
  if (account?.isDemo) {
    return {
      data: demoData,
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  return query
};

export default useAccountData