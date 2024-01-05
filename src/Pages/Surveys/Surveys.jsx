import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Survey from "./Survey";

const Surveys = () => {
    const axiosPublic = useAxiosPublic();
    const {data: surveys=[], refetch} = useQuery({
        queryKey: ["surveys"],
        queryFn: async() => {
            const result = await axiosPublic.get('/surveys/approved');
            return result.data;
        }
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {
                surveys.map(survey => <Survey key={survey._id} survey={survey} refetch={refetch}></Survey>)
            }
        </div>
    );
};

export default Surveys;