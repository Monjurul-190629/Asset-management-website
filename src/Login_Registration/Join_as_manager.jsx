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
            Profile_image : Profile_image,
            Date_of_Birth: Date_of_Birth,
            Company_name: Company_name,
            Company_logo: Company_logo,
            Selected_package: Selected_package,
            role: 'HR_manager',
            limit : 0,
            Employee_count : 0
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
        <div className="pt-20 md:mx-32 mx-0">
            <Helmet>
                <title>Join as Manager</title>
            </Helmet>
            <div className="md:bg-purple-600 rounded-lg">
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:p-20 max-w-screen-xl">
                    <div className="px-16 md:px-10 py-10 bg-gray-300 rounded-xl w-[350px] md:w-[770px] border-x-slate-400">
                        <h2 className="text-xl font-semibold mb-5 underline">Register as a New HR_Manager:</h2>
                        <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Full Name : </p>
                                <input type="text" id="fullName" className="w-full mb-5 p-1 " name="fullName" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Profile_image : </p>
                                <input type="text" id="profile_image" className="w-full mb-5 p-1 " name="profile_image" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Company Name : </p>
                                <input type="text" id="companyName" className="w-full mb-5 p-1 " name="companyName" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Company Logo url : </p>
                                <input type="text" id="companyLogoUrl" className="w-full mb-5 p-1 " name="companyLogoUrl" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Email : </p>
                                <input type="email" id="email" className="w-full mb-5 p-1" name="email" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Password : </p>
                                <input type="password" id="password" className="w-full mb-5 p-1" name="password" required />
                            </div>

                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Date_of_Birth : </p>
                                <input type="text" id="date" className="w-full mb-5 p-1" name="date" placeholder="dd-mm--yy" required />
                            </div>
                            <div className="form-group mb-5">
                                <p className="font-bold text-xl mb-2">Select a package : </p>
                                <select name="package" className="py-2 px-2 rounded-md">
                                    <option value="">Select package</option>
                                    <option value="1">5 members for $5</option>
                                    <option value="2">10 members for $8</option>
                                    <option value="3">20 members for $15</option>
                                </select>
                            </div>


                            {/* Modal */}
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button type="Submit" className="btn bg-blue-700 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black">Sign up</button>
                            <br/>
                            <div className="mt-5">
                                <button onClick={handleGoogleSignup} className="btn bg-blue-700 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black">Sign up with your gmail <FaGoogle /></button>
                            </div>
                        </form>
                    </div>
                    <div className="info-container">
                        <img
                            src="https://www.time4learning.com/_img/buttons/signUpYellow_button.png" className="w-[300px] md:w-[500px] md:h-[400px] rounded-lg"
                            alt="Sign up image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join_as_manager;