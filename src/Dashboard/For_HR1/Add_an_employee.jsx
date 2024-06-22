import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const Add_an_employee = () => {
    const [limit, setLimit] = useState(0);
    const [users, setUsers] = useState([]);
    const [employee, setEmployee] = useState(0);
    const { user } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/companyHolder')
            .then(res => res.json())
            .then(data => setLimit(data[0].limit))
            .catch(error => console.error('Error fetching company holder data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(user => user.Company_name === null);
                setUsers(filtered);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/companyHolder/${user.email}`)
                .then(res => res.json())
                .then(d => setEmployee(d.Employee_count))
                .catch(error => console.error('Error fetching company holder data:', error));
        }
    }, [user]);

    const handleAddTeam = (u1) => {
        fetch(`http://localhost:5000/users/${u1._id}`, {
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

                fetch(`http://localhost:5000/companyHolder/${user.email}`, {
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
                                            <button onClick={() => handleAddTeam(user)} className="py-1 px-2 bg-purple-800 text-white rounded-lg">Add team</button>
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
