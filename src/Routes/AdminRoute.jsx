import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, adminLoading] = useAdmin();
    const location = useLocation();
    if (loading || adminLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <p>Loading</p>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user && isAdmin) {
        return children
    }
    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;