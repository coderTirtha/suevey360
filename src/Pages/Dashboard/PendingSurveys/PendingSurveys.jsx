import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingSurveys = () => {
    const axiosSecure = useAxiosSecure();
    const { data: pendingSurveys = [], refetch } = useQuery({
        queryKey: ["pendingSurveys"],
        queryFn: async () => {
            const result = await axiosSecure.get('/surveys/pending', { withCredentials: true });
            return result.data;
        }
    });
    refetch();
    return (
        <div>
            <Helmet>
                <title>Pending Surveys | Survey360</title>
            </Helmet>
            <h1 className="text-center font-bold text-4xl my-8">Pending Surveys</h1>
            {
                pendingSurveys.length ? <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Surveyor Email</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingSurveys.map((survey, idx) => <tr key={survey._id}>
                                    <th>{idx + 1}</th>
                                    <td>{survey?.title}</td>
                                    <td>{survey?.surveyorEmail}</td>
                                    <td>{survey?.category}</td>
                                    <td className="uppercase text-amber-600">{survey?.status}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div> :
                    <p className="text-gray-400 text-center">No pending surveys.</p>
            }
        </div>
    );
};

export default PendingSurveys;