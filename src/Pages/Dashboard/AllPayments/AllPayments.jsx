import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPayments = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments', { withCredentials: true });
            return res.data;
        }
    })
    return (
        <div>
            <div className="my-8">
                <h1 className="text-4xl font-bold text-center">All Payments</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Plan Name</th>
                            <th>Customer Email</th>
                            <th>Transaction ID</th>
                            <th>Paid Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, idx) => <tr>
                                <th>{idx + 1}</th>
                                <td>{payment?.product?.name}</td>
                                <td>{payment?.email}</td>
                                <td>{payment?.transactionId}</td>
                                <td className={`${payment.paidStatus ? "text-green-500" : "text-amber-600"}`}>{payment?.paidStatus ? "Paid" : "Due"}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPayments;