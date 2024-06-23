import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Add_an_employee = () => {
    const [limit, setLimit] = useState(0);
    const [users, setUsers] = useState([]);
    const [employee, setEmployee] = useState(0);
    const { user } = useAuth();
    const [data, setData] = useState([]);

    const navigate = useNavigate();


    const handleShow = () => {
        Swal.fire({
            title: 'Error!',
            text: 'Your Package Limit is 0 .. So you have to Buy our package Limit',
            icon: 'danger',
            confirmButtonText: 'Package page'
        })
        navigate('/Dashboard/package')
    }

    useEffect(() => {
        fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
            .then(res => res.json())
            .then(dat => setLimit(dat.limit))
            .catch(error => console.error('Error fetching company holder data:', error));
    }, []);

    console.log(limit)

    useEffect(() => {
        fetch('https://service-provider-website-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(user => user.Company_name === null);
                setUsers(filtered);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
                .then(res => res.json())
                .then(d => setEmployee(d.Employee_count))
                .catch(error => console.error('Error fetching company holder data:', error));
        }
    }, [user]);

    const handleAddTeam = (u1) => {
        fetch(`https://service-provider-website-server.vercel.app/users/${u1._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: u1.name,
                email: u1.email,
                Date_of_Birth: u1.Date_of_Birth,
                role: u1.role,
                Profile_image: u1.Profile_image,
                Company_name: data.Company_name,
                Company_logo: data.Company_logo
            })
        })
            .then(res => res.json())
            .then(updatedUser => {
                const remaining = users.filter(user => user._id !== u1._id);
                setUsers(remaining);

                console.log(updatedUser)

                setLimit(prevLimit => prevLimit - 1);
                setEmployee(prev => prev + 1);

                fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        limit: limit - 1,
                        Employee_count: employee + 1
                    })
                })
                    .then(res => res.json())
                    .then(updatedLimit => console.log('Limit updated on the server:', updatedLimit))
                    .catch(error => console.error('Error updating limit:', error));
            })
            .catch(error => console.error('Error updating user:', error));
    };

    return (
        <div>
            <Helmet>
                <title>Add an Employee</title>
            </Helmet>
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="text-2xl font-semibold">
                    Total Employee: {employee}
                </div>
                <div className="text-2xl font-semibold">
                    <span className="pr-5">Package limit: {limit}</span>
                    <Link to="/Dashboard/Package">
                        <button className="bg-purple-700 py-1 px-2 rounded-xl text-[16px] text-white">Increase limit</button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center py-10">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </td>
                                        <td>
                                            <img src={user.Profile_image} alt="Avatar Tailwind CSS Component" className="w-[60px] flex justify-center" />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>
                                            {
                                                limit === 0 ? <>
                                                <button onClick = {handleShow} className="py-1 px-2 bg-slate-800 text-white rounded-lg">Add me</button>
                                                </> : <>
                                                <button onClick={() => handleAddTeam(user)} className="py-1 px-2 bg-purple-800 text-white rounded-lg">Add team</button>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No users without a company</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Add_an_employee;
