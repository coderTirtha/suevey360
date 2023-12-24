import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSurveyor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isSurveyor = [] } = useQuery({
        queryKey: [user?.email, "isSurveyor"],
        queryFn: async() => {
            const result = await axiosSecure.get(`/users/surveyor/${user?.email}`, {withCredentials: true});
            return result.data;
        }
    })
    return [isSurveyor];
};

export default useSurveyor;