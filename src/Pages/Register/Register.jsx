import { Helmet } from "react-helmet-async";
import registerImg from "../../assets/register.gif";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(resData => {
                updateUser(data.name, data.photoURL)
                .then(updateRes => {
                    toast.success("User profile created successfully!");
                })
            })
            .catch(err => {
                toast.error(err.message);
            })
    };
    return (
        <div>
            <Helmet>
                <title>Register | Survey360</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex-1 hidden lg:block">
                    <img src={registerImg} alt="" />
                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input {...register("photoURL", { required: true })} type="url" placeholder="Photo URL" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered w-full" />
                        </div>
                        <button className="btn mt-6 bg-[#545454] text-white hover:text-[#545454] btn-block">Register</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;