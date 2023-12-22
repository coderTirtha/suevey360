import { Link } from 'react-router-dom';
import loginImg from '../../assets/login.gif';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        signIn(data.email, data.password)
            .then(data => {
                toast.success("User logged in successfully!");
            })
            .catch(err => {
                toast.error(err.message);
            })
    };
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex-1 hidden lg:block'>
                <img src={loginImg} alt="" />
            </div>
            <div className='flex-1'>
                <h1 className='text-4xl font-bold text-center mb-6'>Login</h1>
                <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
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
                    <button className='btn btn-block mt-6 bg-[#fca311]'>Login</button>
                    <p className='text-center mt-2'>Don't have an account? <Link to={'/register'} className='text-[#fca311] font-semibold'>Register</Link></p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;