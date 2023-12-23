import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';
import { RiMenu2Fill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logoWhite.png';
import { FaHome } from 'react-icons/fa';
import { MdOutlineAddBox, MdOutlinePendingActions } from "react-icons/md";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <Helmet>
                <title>Dashboard | Survey360</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn fixed z-50 top-2 right-2 drawer-button lg:hidden"><RiMenu2Fill className="text-xl" /></label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 min-h-full bg-[#212529] text-white flex flex-col justify-around">
                        {/* Sidebar content here */}
                        <div>
                            <img src={logo} alt="" className="w-[150px] mx-auto" />
                        </div>
                        <div>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to='/dashboard/surveyorHome'><FaHome className="text-lg mr-2" />Surveyor Home</NavLink></li>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to="/dashboard/addSurvey"><MdOutlineAddBox className="text-lg mr-2" />Add Surveys</NavLink></li>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to="/dashboard/pendingSurveys"><MdOutlinePendingActions className="text-lg mr-2" />Pending Surveys</NavLink></li>
                        </div>
                        <div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;