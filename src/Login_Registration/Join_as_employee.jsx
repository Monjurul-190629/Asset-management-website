import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
// for google sign up
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.config";



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

        const userInfo = {
            name: name,
            email: email,
            Date_of_Birth: Date_of_Birth,
            role: 'employee'
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
                    name : result.user?.displayName,
                    email: result.email?.email,
                    Date_of_Birth : result.date_of_birth?.date_of_birth,
                    role : 'employee'
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
        <div className="pt-20 md:mx-32 mx-0">
            <div className="md:bg-purple-400 rounded-lg">
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:p-20 max-w-screen-xl">
                    <div className="px-16 md:px-20 py-10 bg-gray-300 rounded-xl w-[470px] border-x-slate-400">
                        <h2 className="text-xl font-semibold mb-5">Register as a New Employee</h2>
                        <form onSubmit={handleRegistration}>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Full Name : </p>
                                <input type="text" id="fullName" className="w-full mb-5 p-1 " name="fullName" required />
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
                                <input type="date" id="date" className="w-full mb-5 p-1" name="date" required />
                            </div>

                            <button type="submit" className="btn btn-primary">Sign Up</button>
                            <div className="flex justify-center items-center mt-5">
                                <button onClick={handleGoogleSignup} className="btn bg-blue-500 text-white hover:text-black hover:bg-white hover:border-2 hover:border-black">Sign up with your gmail <FaGoogle /></button>
                            </div>
                        </form>
                    </div>
                    <div className="info-container">
                        <img
                            src="https://i.ibb.co/pwT3gDb/sign-up-edit-mail-icon-glossy-blue-round-button-isolated-abstract-illustration-90055351.jpg" className="w-[300px] md:w-[500px] md:h-[400px] rounded-lg"
                            alt="Sign up image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join_as_employee;