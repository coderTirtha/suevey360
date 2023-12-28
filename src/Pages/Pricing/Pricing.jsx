import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PricingCard from "./PricingCard";

const Pricing = () => {
    const axiosPublic = useAxiosPublic();
    const { data: pricing = [] } = useQuery({
        queryKey: ["pricing"],
        queryFn: async () => {
            const result = await axiosPublic.get('/pricing');
            return result.data;
        }
    });
    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-12">Pro User Bundles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {
                    pricing.map(price => <PricingCard key={price._id} price={price}></PricingCard>)
                }
            </div>
        </div>
    );
};

export default Pricing;