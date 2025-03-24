import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navLink = (
        <>
            <li>
                <NavLink
                    to="/"
                    className="font-medium text-black transition duration-300 ease-in-out hover:text-gray-600 hover:scale-105"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/join_as_employee"
                    className="font-medium text-black transition duration-300 ease-in-out hover:text-gray-600 hover:scale-105"
                >
                    Join As Employee
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/join_as_manager"
                    className="font-medium text-black transition duration-300 ease-in-out hover:text-gray-600 hover:scale-105"
                >
                    Join As HR Manager
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/login"
                    className="font-medium text-black transition duration-300 ease-in-out hover:text-gray-600 hover:scale-105"
                >
                    Login
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 py-2 bg-white shadow-md">
            <div className="navbar font-medium text-black px-4">
                <div className="navbar-start">
                    <div className="dropdown mr-5 lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden text-black transition-transform duration-300 hover:scale-110"
                        >
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
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[10] mt-3 w-52 p-2 shadow-lg"
                        >
                            {navLink}
                        </ul>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <img
                            src="https://pluspng.com/img-png/logo-template-png-logo-templates-1655.png"
                            alt="logo"
                            className="w-12 lg:w-14 rounded-xl transition-transform duration-300 transform hover:rotate-12"
                        />
                        <a
                            className="mt-2 text-xl lg:text-2xl font-semibold text-black"
                            style={{
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            ServiceSpectrum
                        </a>
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
