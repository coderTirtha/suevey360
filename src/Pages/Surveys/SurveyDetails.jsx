import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

const SurveyDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const { data: survey = {}, refetch } = useQuery({
        queryKey: ["survey"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/surveys/${id}`, { withCredentials: true })
            return result.data;
        }
    });
    const onSubmit = data => {
        const vote = {
            surveyId: _id,
            vote: data.vote,
            voterEmail: user?.email
        }
        const result = axiosSecure.put(`/survey/vote/${_id}`, vote, { withCredentials: true });
        result.then(resData => {
            console.log(resData.data);
            if (resData.data.modifiedCount > 0) {
                toast.success("Successfully voted!");
                refetch();
            }
        })
    }
    const handleLike = () => {
        const likerEmail = {
            email: user?.email
        }
        axiosSecure.put(`/survey/like/${_id}`, likerEmail, { withCredentials: true })
            .then(likeResData => {
                if (likeResData.data.modifiedCount > 0) {
                    refetch();
                }
            })
    }
    const handleCommentSubmission = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const comment = form.get("comment");
        console.log(comment);
        const newComment = {
            name: user?.displayName,
            email: user?.email,
            comment: comment,
        }
        axiosSecure.put(`/surveys/${id}`, newComment, { withCredentials: true })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    const cmntForm = document.getElementById("cmntForm");
                    cmntForm.reset();
                    refetch();
                }
            })

    }
    return (
        <div className="shadow-md p-4 rounded-md flex flex-col justify-between max-w-lg mx-auto">
            <div className="space-y-2">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold">{survey.title}</h1>
                    <h3 className="badge badge-outline font-semibold ">{survey.category}</h3>
                </div>
                <p>{survey.description}</p>
            </div>
            {
                survey?.yes?.includes(user?.email) || survey?.no?.includes(user?.email) ?
                    <div className="bg-green-200 rounded-md h-[100px] my-4 flex justify-center items-center">
                        <p className="text-center text-xl font-semibold">You have voted for "{survey?.yes?.includes(user?.email) ? "Yes" : "No"}"</p>
                    </div> :
                    <form onSubmit={handleSubmit(onSubmit)} className="my-4 bg-base-200 p-4 rounded-md">
                        <div className="form-control space-y-4">
                            <div className="flex gap-2 items-center">
                                <input {...register("vote")} type="radio" name="vote" className="radio" value={'yes'} />
                                <span className="label-text">Yes</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input {...register("vote")} type="radio" name="vote" className="radio" value={'no'} />
                                <span className="label-text">No</span>
                            </div>
                        </div>
                        <div className="mt-2 space-y-2">
                            <button className="btn bg-[#435367] text-white hover:text-[#435367]">Submit</button>
                            <p className="text-gray-400 text-xs">Be careful! You can submit your vote once!</p>
                        </div>
                    </form>
            }
            <div className="flex gap-2 items-center">
                <AiTwotoneLike />
                <p>{survey?.likes?.includes(user?.email) ? `You and ${survey?.likes?.length - 1} others liked this` : `${survey?.likes?.length} people liked this`}</p>
            </div>
            <div className="flex join w-full">
                <button onClick={handleLike} className={`join-item btn flex-1 ${survey?.likes?.includes(user?.email) && "bg-gray-300"}`}><AiOutlineLike /> Like</button>
                <button className="join-item btn flex-1"><FaRegComment /> Comment</button>
            </div>
            <div className="mt-6">
                <form id="cmntForm" onSubmit={handleCommentSubmission} className="flex gap-2 items-center">
                    <div className="form-control flex-1">
                        <input type="text" name="comment" placeholder="Write Your Comment here" className="input input-sm input-bordered border-gray-500 w-full rounded-full" />
                    </div>
                    <button className="btn btn-sm btn-neutral"><MdSend /></button>
                </form>
            </div>
            {
                survey?.comments?.map((cmnt, idx) => <div className="bg-base-200 rounded-md my-2 p-2" key={idx}>
                    <p className="text-sm font-bold">{cmnt.name ? cmnt.name : "Anonymous"} <span className="text-gray-400 font-normal">({cmnt.email})</span></p>
                    <p className="mt-2">{cmnt.comment}</p>
                </div>)
            }
            <ToastContainer />
        </div>
    );
};

export default SurveyDetails;