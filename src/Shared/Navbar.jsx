import { NavLink } from "react-router-dom";




const Navbar = () => {




    const navLink = <>
        <li>
            <NavLink to="/" className="font-semibold"> Home</NavLink>
        </li>
        <li>
            <NavLink to="/join_as_employee" className="font-semibold">Join As Employee</NavLink>
        </li>
        <li>
            <NavLink to="/join_as_manager" className="font-semibold">Join As HR Manager</NavLink>
        </li>
        <li>
            <NavLink to="/login" className="font-semibold">Login</NavLink>
        </li>
    </>


    return (
        <div className="py-1">
            <div className="navbar  font-[20px] ">
                <div className="navbar-start">
                    <div className="dropdown mr-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow-lg"
                        >
                            {navLink}
                        </ul>
                    </div>

                    <div className="flex justify-center">
                        <img src="https://pluspng.com/img-png/logo-template-png-logo-templates-1655.png" className="w-16 rounded-xl" />
                        <a className=" mt-4 text-xl text-indigo-800" style={{ textShadow: '1px 1px 2px rgba(2, 10, 100, 0.7)' }}>ServiceSpectrum</a>
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