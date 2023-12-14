import { NavLink, Outlet } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import logo from '../assets/logo.png';

const Main = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn fixed top-2 right-2 drawer-button lg:hidden"><RiMenu2Fill /></label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <img src={logo} alt="" className="w-[150px] mx-auto" />
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to="/add-survey">Add Survey</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;