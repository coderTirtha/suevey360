import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSurveyor from "../hooks/useSurveyor";

const SurveyorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isSurveyor, surveyorLoading] = useSurveyor();
    const location = useLocation();
    if (loading || surveyorLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <p>Loading</p>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user && isSurveyor) {
        return children
    }
    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default SurveyorRoute;