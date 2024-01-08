import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import moment from "moment";
import { Link } from "react-router-dom";

const LatestSurveys = () => {
    const axiosPublic = useAxiosPublic();
    const { data: latestSurveys = [], refetch } = useQuery({
        queryKey: ["latestSurveys"],
        queryFn: async () => {
            const result = await axiosPublic.get('/survey/recent')
            return result.data;
        }
    });
    refetch();
    return (
        <div className="my-8">
            <div className="space-y-3 text-center">
                <h1 className="text-4xl font-bold">Latest Surveys</h1>
                <p className="text-gray-400">Dive into our most recent surveys to stay updated on the latest trends and insights.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 mx-6">
                {
                    latestSurveys.map(survey => <div key={survey._id} className="flex flex-col justify-between gap-4 rounded-md shadow-md p-4">
                        <p className="text-gray-400 italic text-sm">{moment(survey.timestamp).local().format("DD-MM-YYYY")}</p>
                        <h2 className="text-xl font-semibold">{survey.title}</h2>
                        <p className="badge badge-sm badge-outline">{survey.category}</p>
                        <p className="mt-4">{survey.description}</p>
                        <Link to={`/surveys/${survey._id}`}>
                            <button className="btn btn-block">Vote Now</button>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LatestSurveys;