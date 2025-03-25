import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import auth from "../Firebase/firebase.config";
import { Helmet } from "react-helmet";

const JoinAsEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();

    const handleRegistration = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userInfo = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            Date_of_Birth: formData.get("date"),
            role: "employee",
            Profile_image: formData.get("profile_image"),
            Company_name: null
        };

        createUser(userInfo.email, formData.get("password"))
            .then(() => {
                axiosPublic.post("/users", userInfo).then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Registered successfully",
                            icon: "success",
                            confirmButtonText: "Cool"
                        });
                    }
                });
            })
            .catch(error => console.error(error.message));
    };

    const handleGoogleSignup = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: "employee"
                };
                axiosPublic.post("/users", userInfo).then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Registered successfully",
                        icon: "success",
                        confirmButtonText: "Cool"
                    });
                });
            })
            .catch(error => console.error(error.message));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-gray-800 p-6">
            <Helmet>
                <title>Join as Employee</title>
            </Helmet>
            <div className="bg-white text-gray-800 shadow-xl border border-gray-700 rounded-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Register as a New Employee</h2>
                <form onSubmit={handleRegistration} className="space-y-4">
                    <input type="text" name="fullName" placeholder="Full Name" className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black" required />
                    <input type="text" name="profile_image" placeholder="Profile Image URL" className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black" required />
                    <input type="email" name="email" placeholder="Email" className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black" required />
                    <input type="password" name="password" placeholder="Password" className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black" required />
                    <input type="text" name="date" placeholder="Date of Birth" className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black" required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                </form>
                <div className="text-center mt-4 text-gray-600">or</div>
                <button onClick={handleGoogleSignup} className="w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition mt-4">
                    <FaGoogle /> Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default JoinAsEmployee;
