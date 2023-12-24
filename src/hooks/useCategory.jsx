import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
    const axiosPublic = useAxiosPublic();
    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosPublic.get('/categories');
            return response.data;
        }
    })
    return categories;
};

export default useCategory;