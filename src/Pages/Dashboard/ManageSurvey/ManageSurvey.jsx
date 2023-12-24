import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const ManageSurvey = () => {
    const axiosSecure = useAxiosSecure();
    const {data: surveys = [], refetch} = useQuery({
        queryKey: ["surveys"],
        queryFn: async() => {
            const result = await axiosSecure.get('/surveys', {withCredentials: true});
            return result.data;
        }
    })
    const handleSurveyStatus = (id, title, status) => {
        const updatedStatus = {status}
        console.log(updatedStatus);
        axiosSecure.patch(`/surveys/${id}`, updatedStatus, {withCredentials: true})
        .then(res => {
            if(res.data.modifiedCount) {
                toast.success(`${title} has been ${status}d`);
                refetch();
            }
        })
    }
    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-8">Manage Surveys</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Timestamp</th>
                            <th>Survey Title</th>
                            <th>Surveyor Email</th>
                            <th>Survey Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveys.map((survey, idx) => <tr key={survey._id}>
                                <th>{idx + 1}</th>
                                <td>{survey.timestamp}</td>
                                <td>{survey.title}</td>
                                <td>{survey.surveyorEmail}</td>
                                <td>{survey.category}</td>
                                <td>
                                    {
                                        survey?.status === "pending" ?
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => handleSurveyStatus(survey._id, survey.title, "approve")} className="btn btn-sm bg-green-500 text-white hover:text-green-500">Approve</button>
                                            <button onClick={() => handleSurveyStatus(survey._id, survey.title, "decline")} className="btn btn-sm bg-red-500 text-white hover:text-red-500">Decline</button>
                                        </div> :
                                        survey?.status === "approve" ?
                                        <p className="text-green-500 uppercase">{survey.status}d</p> :
                                        <p className="text-red-500 uppercase">{survey.status}d</p>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ManageSurvey;