import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth'; // Assume this hook provides the authenticated user
import useAxiosSecure from './useAxiosSecure'; // Assume this hook provides an Axios instance

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, error, isLoading } = useQuery({
    queryKey: [user?.email, 'user'],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email is not defined");
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email // Only run the query if the user email is defined
  });

  return { userData, isLoading, error };
};

export default useUser;
