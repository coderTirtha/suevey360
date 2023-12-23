import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if(loading) {
        return <div className="min-h-screen flex justify-center items-center">
            <p>Loading</p>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user) {
        return children;
    }
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoute;