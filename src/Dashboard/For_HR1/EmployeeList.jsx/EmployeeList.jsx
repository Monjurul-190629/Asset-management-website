import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const EmployeeList = () => {
    const [employee, setEmployee] = useState(0);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const [limit, setLimit] = useState(0);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
                .then(res => res.json())
                .then(d => setEmployee(d.Employee_count))
                .catch(error => console.error('Error fetching company holder data:', error));
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    useEffect(() => {
        if (data.Company_name) {
            fetch('https://service-provider-website-server.vercel.app/users')
                .then(res => res.json())
                .then(dat => {
                    const filtered = dat.filter(user => (user.Company_name === data.Company_name) && (user.role === 'employee'));
                    setUsers(filtered);
                })
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [data.Company_name]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
                .then(res => res.json())
                .then(d => setLimit(d.limit))
                .catch(error => console.error('Error fetching limit data:', error));
        }
    }, [user]);

    const handleRemove = (u1) => {
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
                Company_name: null,
                Company_logo: u1.Company_logo
            })
        })
            .then(res => res.json())
            .then(updatedUser => {
                const remaining = users.filter(user1 => user1._id !== u1._id);
                setUsers(remaining);
                console.log(updatedUser)

                setEmployee(prev => prev - 1);

                fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        limit: limit,
                        Employee_count: employee - 1
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
                <title>My Employee List</title>
            </Helmet>
            <div className="text-center pt-10">
                <h3 className="text-2xl font-semibold">Number of the Employees: {employee}</h3>
            </div>
            <div>
                <div className="flex justify-center items-center py-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-xl font-semibold text-black underline">
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
                                            <td className="font-semibold">{user.name}</td>
                                            <td>
                                                <button onClick={() => handleRemove(user)} className="py-2 px-2 bg-purple-700 text-[18px] text-white rounded-lg">Remove From Team</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No employee in the company</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
