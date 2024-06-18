import { NavLink } from "react-router-dom";




const Navbar = () => {

    

    
    const navLink = <>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/join_as_employee">Join_As_Employee</NavLink>
        </li>
        <li>
            <NavLink to="/join_as_manager">Join_As_HR_Manager</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
    </>
    

    return (
        <div>
            <div className="navbar fixed z-30 opacity-80 bg-purple-800 text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <div className="flex">
                        <img src="https://i.ibb.co/FwnDR32/circle-icon-demo-4x.jpg" className="w-16" />
                        <a className="btn btn-ghost text-xl text-gray-300" style={{ textShadow: '2px 2px 4px rgba(255, 10, 100, 0.7)' }}>ServiceSpectrum</a>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-sm menu-horizontal px-1">
                        {navLink}
                    </ul>
                </div>



            </div>
        </div>
    );
};

export default Navbar;