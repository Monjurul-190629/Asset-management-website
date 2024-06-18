import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useManager from "../Hooks/useManager";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const Dashboard = () => {
    const [isManager] = useManager();
    /// navigate
    const navigate = useNavigate();
    console.log(isManager)
    /// user logout
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("log out successfully");
                navigate('/')
            }
            )
            .catch((error) => console.log(error.message))
    }
    console.log(user)


    const [data, setData] = useState([]);
    /// load data
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
        }

    }, [user])


    console.log(data.name)
    console.log(data.email)



    const navLink = <>

        <li>
            <NavLink to="/Dashboard/Home1">Home</NavLink>
        </li>
        <li>
            <NavLink to="/Dashboard/AssetList">Asset List</NavLink>
        </li>
        <li>
            <NavLink to="/Dashboard/Add_an_asset">Add an asset</NavLink>
        </li>
        <li>
            <NavLink to="/Dashboard/All_requests">All requests</NavLink>
        </li>
        <li>
            <NavLink to="/Dashboard/MyEmployeeList">My employee list</NavLink>
        </li>
        <li>
            <NavLink to="/Dashboard/Profile">Profile</NavLink>
        </li>


    </>

    const navLink1 = <>

        <li>
            <NavLink to="/Employee/Home">Home</NavLink>
        </li>
        <li>
            <NavLink to="/Employee/My_assets">My Assets</NavLink>
        </li>
        <li>
            <NavLink to="/Employee/My_team">My Team</NavLink>
        </li>
        <li>
            <NavLink to="/Employee/Request_for_asset">Request for an asset</NavLink>
        </li>
        <li>
            <NavLink to="/Profile">Profile</NavLink>
        </li>


    </>
    return (
        <div>
            {
                isManager ?
                    <>

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
                                <div>
                                    <img src={data.Company_logo} className="w-16" />
                                </div>
                                <a className="btn btn-ghost text-xl">{data.Company_name}</a>
                            </div>
                            <div className="navbar-center hidden lg:flex">
                                <ul className="menu menu-sm menu-horizontal px-1">
                                    {navLink}
                                </ul>
                            </div>
                            <div className="navbar-end">
                                {
                                    user ? <>
                                        <div className="tooltip  hover:tooltip-open" data-tip={data.name}>
                                            <span><img src={user.photoURL} className="ml-12 w-1/3 md:w-1/4" /></span>
                                        </div>

                                        <a onClick={handleLogout} className="btn btn-sm">Log out</a>
                                    </> :
                                        <>

                                        </>
                                }
                            </div>
                        </div>

                    </> :
                    <>

                        <div className="navbar fixed z-30 opacity-80 bg-purple-800 text-white max-w-screen-xl">
                            <div className="navbar-start">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        {navLink1}
                                    </ul>
                                </div>
                                <a className="btn btn-ghost text-xl">daisyUI</a>
                            </div>
                            <div className="navbar-center hidden lg:flex">
                                <ul className="menu menu-sm menu-horizontal px-1">
                                    {navLink1}
                                </ul>
                            </div>
                            <div className="navbar-end">
                                {
                                    user ? <>
                                        <div className="tooltip  hover:tooltip-open" data-tip={data.name}>
                                            <span><img src={data.photoURL} className="ml-12 w-1/3 md:w-1/4" /></span>
                                        </div>

                                        <a onClick={handleLogout} className="btn btn-sm">Log out</a>
                                    </> :
                                        <>

                                        </>
                                }
                            </div>
                        </div>


                    </>
            }
            {/* Dashboard content */}
            <div className="pt-24">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;