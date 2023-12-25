import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axiosSecure.get('/users', { withCredentials: true });
            return result.data;
        }
    });
    const handleRole = (role, name, id) => {
        const assignedRole = {role}
        console.log(assignedRole);
        axiosSecure.patch(`/users/${id}`, assignedRole, {withCredentials: true})
        .then(res => {
            if(res.data.modifiedCount) {
                toast.success(`${name} is ${role} now!`);
                refetch();
            }
        })
    }
    return (
        <div>
            <h1 className="text-center font-bold text-4xl my-8">All Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="uppercase">{user.role}</td>
                                <td>
                                    {
                                        user?.role === "admin" || "surveyor" ? <p>N/A</p> : <div className="flex flex-col gap-2">
                                            <button onClick={() => handleRole("admin", user.name, user._id)} className="btn btn-sm bg-red-500 text-white hover:text-red-500">Make Admin</button>
                                            <button onClick={() => handleRole("surveyor", user.name, user._id)} className="btn btn-sm bg-green-500 text-white hover:text-green-500">Make Surveyor</button>
                                        </div>
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

export default ManageUsers;