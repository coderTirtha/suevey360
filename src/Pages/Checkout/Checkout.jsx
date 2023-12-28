import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const { data: selectedPricing = {} } = useQuery({
        queryKey: ["selectedPricing"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/pricing/${id}`, { withCredentials: true });
            return result.data;
        }
    });
    const onSubmit = data => {
        console.log(data);
        data.productId = id;
        data.customerName = user?.displayName;
        axiosSecure.post('/payment', data, {withCredentials: true})
        .then(res => {
            if(res.data?.url) {
                window.location.replace(res.data?.url);
            }
            toast.error(res.data?.message);
        });
    }
    return (
        <div>
            <div className='my-8 space-y-2'>
                <h1 className='text-center text-4xl font-bold'>Check Out</h1>
                <p className='text-center text-gray-400'>Go and checkout to become a premium user</p>
            </div>
            <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Pricing Name</span>
                    </label>
                    <input {...register("pricingName")} defaultValue={selectedPricing.name} type="text" readOnly placeholder="Pricing Name" className="input input-bordered w-full" />
                </div>
                <div className='flex gap-2'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email")} defaultValue={user.email} type="email" readOnly placeholder="Email" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input {...register("phone")} type="phone" placeholder="Phone" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='flex gap-2 flex-1'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Currency</span>
                            </label>
                            <select {...register("currency", {required: true})} className="select select-bordered">
                                <option>USD</option>
                                <option>BDT</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input {...register("price", {required: true})} defaultValue={selectedPricing.price} type="text" placeholder="Price" readOnly className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input {...register("address", {required: true})} type="text" placeholder="Address" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <button className='btn'>Checkout</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Checkout;