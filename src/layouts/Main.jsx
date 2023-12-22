import { NavLink, Outlet } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { IoPricetags } from "react-icons/io5";
import { GrLogin } from "react-icons/gr";
import logo from '../assets/logoWhite.png';

const Main = () => {
    return (
        <div>
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
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to='/'><FaHome className="text-lg mr-2" />Home</NavLink></li>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to="/surveys"><FcSurvey className="text-lg mr-2" />All Surveys</NavLink></li>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to="/pricing"><IoPricetags className="text-lg mr-2" />Pricing</NavLink></li>
                        </div>
                        <div>
                            <li className="hover:bg-gray-400 hover:rounded-lg"><NavLink to={'/login'}><GrLogin className="text-lg mr-2" />Login</NavLink></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;