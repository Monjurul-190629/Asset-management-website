import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";




const Login = () => {

    const { signInuser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    

    //// axios 
    const axiosPublic = useAxiosPublic();

    

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)


        /// check manager or not

        
        
        /// Login
        signInuser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate('/Dashboard/Home3')
            })
            .catch(error => {
                toast(error.message)
            })
    }

    /// login google
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const userInfo = {
                    name : result.user?.displayName,
                    email: result.email?.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    navigate('/Dashboard/Home3')
                    console.log(res.data)
                })
                
            })
            .catch(error => console.log(error.message))
    }

    




    return (
        <div className="hero py-10 px-4 sm:px-6 md:px-10 ">
            <Helmet>
                Login
            </Helmet>
            <div className="hero-content flex flex-col lg:flex-row-reverse items-center ">
                <div className="card mt-5 lg:mt-0 shrink-0 w-full max-w-xs md:max-w-sm bg-slate-200 shadow-2xl border-2 border-slate-500  px-5 md:px-5 py-5">
                    <form
                        className="card-body text-slate-900 font-normal flex flex-col justify-center items-center"
                        onSubmit={handleLogin}
                    >
                        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">Login now</h1>

                        <div className="form-control w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className="text-black border-b-2 lg:w-[240px] border-slate-500 outline-none py-2 w-full placeholder-slate-500 text-normal bg-[#ede9ff] text-justify"
                                required
                            />
                        </div>

                        <div className="form-control w-full mt-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="text-black border-b-2 border-slate-500 outline-none py-2 w-full lg:w-[240px] placeholder-slate-500 text-normal bg-[#ede9ff] text-justify"
                                required
                            />
                        </div>

                        <div className="form-control mt-6 w-full">
                            <button className="btn hover:bg-blue-800 bg-blue-600 hover:text-slate-200 text-white w-full">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="flex gap-3 justify-center mt-4">
                        <button
                            className="text-xl py-2 px-3 border-2 text-black border-slate-500 rounded-lg bg-transparent"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle />
                        </button>
                    </div>

                    <p className="text-center text-slate-900 mt-4 font-bold">
                        New here? Please{" "}
                        <Link to="/Registration">
                            <span className="text-blue-800 underline">Register</span>
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;