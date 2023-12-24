import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin, isPending: adminLoading} = useQuery({
        queryKey: [],
        queryFn: async() => {
            const result = await axiosSecure.get(`/users/admin/${user?.email}`, {withCredentials: true});
            return result.data?.admin;
        }
    })
    return [isAdmin, adminLoading];
};

export default useAdmin;