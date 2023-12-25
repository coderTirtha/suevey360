import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Main from "../layouts/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AddSurvey from "../Pages/Dashboard/AddSurvey/AddSurvey";
import AdminRoute from "./AdminRoute";
import ManageSurvey from "../Pages/Dashboard/ManageSurvey/ManageSurvey";
import SurveyorRoute from "./SurveyorRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // Surveyor Routes in Dashboard
            {
                path: '/dashboard/addSurvey',
                element: <SurveyorRoute><AddSurvey></AddSurvey></SurveyorRoute>
            },

            // Admin Routes in Dashboard
            {
                path: '/dashboard/manageSurveys',
                element: <AdminRoute><ManageSurvey></ManageSurvey></AdminRoute>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]
    }
]);

export default router;