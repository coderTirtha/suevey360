import { useForm } from "react-hook-form";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Survey = ({ survey, refetch }) => {
    const { user } = useAuth();
    const { _id, title, category, yes = [], no = [], likes = [] } = survey;
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
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
    const handleComment = () => {
        axiosSecure.get(`/user/role/${user?.email}`, { withCredentials: true })
            .then(commentResData => {
                if(commentResData.data.role === "pro" || commentResData.data.role === "admin" || commentResData.data.role === "surveyor") {
                    navigate(`/surveys/${_id}`);
                } else {
                    toast.warn("You have to be a PRO user to comment on surveys!");
                    setTimeout(() => {
                        navigate('/pricing');
                    }, 3000);
                }
            })
    }
    return (
        <div className="shadow-md p-4 rounded-md flex flex-col justify-between">
            <div className="space-y-2">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <h3 className="badge badge-outline font-semibold ">{category}</h3>
                </div>
            </div>
            {
                yes.includes(user?.email) || no.includes(user?.email) ?
                    <div className="bg-green-200 rounded-md h-[100px] my-4 flex justify-center items-center">
                        <p className="text-center text-xl font-semibold">You have voted for "{yes.includes(user?.email) ? "Yes" : "No"}"</p>
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
                <p>{likes.includes(user?.email) ? `You and ${likes.length - 1} others liked this` : `${likes.length} people liked this`}</p>
            </div>
            <div className="flex join w-full">
                <button onClick={handleLike} className={`join-item btn flex-1 ${likes.includes(user?.email) && "bg-gray-300"}`}><AiOutlineLike /> Like</button>
                <button onClick={handleComment} className="join-item btn flex-1"><FaRegComment /> Comment</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Survey;