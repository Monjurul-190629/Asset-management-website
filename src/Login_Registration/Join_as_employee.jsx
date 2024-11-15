import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
// for google sign up
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { Helmet } from "react-helmet";



const Join_as_employee = () => {



    const axiosPublic = useAxiosPublic();
    const { createUser } = useContext(AuthContext)

    const provider = new GoogleAuthProvider();

    const handleRegistration = e => {
        e.preventDefault();
        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const Date_of_Birth = e.target.date.value;
        const Profile_image = e.target.profile_image.value;
        const userInfo = {
            name: name,
            email: email,
            Date_of_Birth: Date_of_Birth,
            role: 'employee',
            Profile_image: Profile_image,
            Company_name: null
        }
        console.log(userInfo)


        /// create employee
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Registrared successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'

                            })
                        }
                    })

            })
            .catch(error => {
                console.log(error.message)
            })

    }

    const handleGoogleSignup = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.email?.email,
                    Date_of_Birth: result.date_of_birth?.date_of_birth,
                    role: 'employee'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Registrared successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'

                        })
                        console.log(res.data)
                    })

            })
            .catch(error => console.log(error.message))
    }



    return (
        <div className="pt-4 md:pt-0 md:mx-32 mx-0">
            <Helmet>
                <title>Join as Manager</title>
            </Helmet>
            <div className="rounded-lg">
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:p-12 max-w-screen-xl">
                    <div className="px-8 md:px-4 py-12 bg-gray-200 rounded-xl w-[350px] md:w-[410px] border-2 border-slate-600">
                        <h2 className="text-xl text-center font-semibold lg:mb-8 mb-5 mt-5 underline ">Register as a New Employee:</h2>
                        <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-1 justify-center items-center text-center gap-1 md:gap-2">
                            <div className="form-group">
                                <input type="text" id="fullName" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500 text-justify" name="fullName" placeholder="Name" required />
                            </div>
                            <div className="form-group">
                                <input type="text" id="profile_image" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500 text-justify" name="profile_image" placeholder="Profile image link" required />
                            </div>

                            <div className="form-group">
                                <input type="email" id="email" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500 text-justify" name="email" placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500 text-justify" placeholder="Password" name="password" required />
                            </div>

                            <div className="form-group">
                                <input type="text" id="date" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500 text-justify" name="date" placeholder="Date of Birthday" required />
                            </div>
                            <div>
                                <button type="Submit" className="btn bg-slate-500 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black lg:w-[280px] " >Sign up</button>
                            </div>
                            <br />
                            <div className="">
                                <button onClick={handleGoogleSignup} className="btn mb-10 -mt-4 bg-slate-500 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black lg:w-[280px]">Sign up with your gmail <FaGoogle /></button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Join_as_employee;