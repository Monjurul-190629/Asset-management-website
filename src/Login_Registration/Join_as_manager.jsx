import { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const Join_as_manager = () => {


    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();
    const { createUser } = useContext(AuthContext)

    const provider = new GoogleAuthProvider();

    const handleRegistration = e => {
        e.preventDefault();
        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const Date_of_Birth = e.target.date.value;
        const Company_name = e.target.companyName.value;
        const Company_logo = e.target.companyLogoUrl.value;
        const Selected_package = e.target.package.value;
        const Profile_image = e.target.profile_image.value;
        const userInfo = {
            name: name,
            email: email,
            Profile_image: Profile_image,
            Date_of_Birth: Date_of_Birth,
            Company_name: Company_name,
            Company_logo: Company_logo,
            Selected_package: Selected_package,
            role: 'HR_manager',
            limit: 0,
            Employee_count: 0
        }
        console.log(userInfo)


        /// create employee
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                axiosPublic.post('/users', userInfo)
                axiosPublic.post('/companyHolder', userInfo)
                    .then(res => {
                        navigate('/')
                        console.log(res.data)
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
                    role: 'HR_manager'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/')

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
        <div className="flex justify-center items-center">
            <div className="pt-4 md:pt-0 md:mx-32 mx-0">
                <Helmet>
                    <title>Join as Manager</title>
                </Helmet>
                <div className="rounded-lg">
                    <div className="flex flex-col-reverse md:flex-row justify-center items-center md:p-20 max-w-screen-xl ">
                        <div className="px-16 md:px-10 py-10 bg-gray-200 rounded-xl w-[350px] md:w-[770px] border-2 border-slate-600">
                            <h2 className="text-xl text-center font-semibold mb-10 underline ">Register as a New HR Manager:</h2>
                            <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                <div className="form-group">
                                    <input type="text" id="fullName" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="fullName" placeholder="Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="profile_image" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="profile_image" placeholder="Profile image link" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="companyName" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="companyName" placeholder="Company Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="companyLogoUrl" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="companyLogoUrl" placeholder="Company Logo Link" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="email" placeholder="Email" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="password" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" placeholder="Password" name="password" required />
                                </div>

                                <div className="form-group">
                                    <input type="text" id="date" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500" name="date" placeholder="Date of Birthday" required />
                                </div>
                                <div className="form-group mb-5">
                                    <select name="package" className="w-[220px] lg:w-[260px] mb-5 py-2 outline-0 placeholder-black bg-slate-200 border-b-2 border-slate-500">
                                        <option value="">Select package</option>
                                        <option value="1">5 members for $5</option>
                                        <option value="2">10 members for $8</option>
                                        <option value="3">20 members for $15</option>
                                    </select>
                                </div>


                                {/* Modal */}
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button type="Submit" className="btn bg-slate-600 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black w-[220px] lg:w-[620px]" >Sign up</button>
                                <br />
                                <div className="-mt-5 md:mt-5">
                                    <button onClick={handleGoogleSignup} className="btn bg-slate-600 text-white hover:text-black w-[220px] hover:bg-white hover:border-2 hover:border-black lg:w-[620px]">Sign up with your gmail <FaGoogle /></button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join_as_manager;