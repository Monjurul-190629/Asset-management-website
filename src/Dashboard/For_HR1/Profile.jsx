import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const Profile = () => {

    const { user } = useAuth();

    const [data, setData] = useState([]);
    /// load data
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
        }

    }, [user])


    const handleUpdateData = (e) => {
        e.preventDefault();
        const name1 = e.target.fullName.value;



        fetch(`http://localhost:5000/users/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : name1,
                email : data.email,
                Date_of_Birth : data.Date_of_Birth,
                role : data.role,
                Profile_image : data.Profile_image,
                Company_name: data.Company_name,
                Company_logo: data.Company_logo
            })
        })
            .then(res => res.json())
            .then(updatedUser => {
                console.log(updatedUser)
                if (updatedUser.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
            .catch(error => console.error('Error updating user:', error));
    };

    







    return (
        <div className="flex flex-col justify-center items-center">
            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <div className="pt-10">
                <h3 className="text-2xl md:text-3xl font-semibold md:font-serif underline">Update your Information</h3>
            </div>
            <div className="text-center pt-10">
                <form className="" onSubmit={handleUpdateData}>
                    <div className="form-group">
                        <p className="font-bold text-xl mb-2">Full Name : </p>
                        <input type="text" id="fullName" className="w-full mb-5 p-1 border-black border-b-2 placeholder-gray-900 " name="fullName" placeholder={data.name} />
                    </div>

                    <div className="form-group">
                        <p className="font-bold text-xl mb-2">Email : </p>
                        <input type="email" id="email" className="w-[250px] mb-5 p-1 border-black border-b-2 placeholder-gray-900" name="email" placeholder={data.email} readOnly />
                    </div>

                    <button type="submit" className="btn btn-primary btn-md">Update</button>

                </form>
            </div>
        </div>
    );
};

export default Profile;