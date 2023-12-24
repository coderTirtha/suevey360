import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useCategory from '../../../hooks/useCategory';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSurvey = () => {
    const { user } = useAuth();
    const categories = useCategory();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const survey = {
            title: data.title,
            surveyorEmail: data.surveyorEmail,
            category: data.category,
            description: data.description,
            status: "pending",
            timestamp: new Date()
        }
        axiosSecure.post('/surveys', survey, {withCredentials: true})
        .then(res => {
            if(res.data.insertedId) {
                toast.success("Survey has been submitted for admin approval!");
                reset();
            }
        })
    }
    return (
        <div className='my-10'>
            <h1 className='text-center text-4xl font-bold'>Add A Survey</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div className='flex gap-2'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input {...register("title", {required: true})} type="text" placeholder="Survey Title" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("surveyorEmail", {required: true})} defaultValue={user.email} readOnly type="email" placeholder="Email" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register("category", {required: true})} className="select select-bordered w-full" defaultValue="Choose Category">
                        {
                            categories.map(category => <option key={category._id} value={category.category}>{category.category}</option>)
                        }
                    </select>
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input {...register("description", {required: true})} type="text" placeholder="Description" className="input input-bordered w-full" />
                </div>
                <button className='btn btn-block mt-4'>Add Survey</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddSurvey;