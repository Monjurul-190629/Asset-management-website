import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";


const EmployeeList = () => {

    const [employee, setEmployee] = useState(0);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const { user } = useAuth();

    //// for the employee
    useEffect(() => {
        fetch(`http://localhost:5000/companyHolder/${user.email}`)
            .then(res => res.json())
            .then(d => {
                setEmployee(d.Employee_count)
            })
    }, [])
    

    /// load data
    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);
    
    let company = data.Company_name;
    console.log(company)
    console.log(user.email)

    /// Fetch users based on company name
    useEffect(() => {
        if (data.Company_name) {
            fetch('http://localhost:5000/users')
                .then(res => res.json())
                .then(dat => {
                    const filtered = dat.filter(user => (user.Company_name === data.Company_name) && (user.role === 'employee'));
                    setUsers(filtered);
                })
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [data.Company_name]);

    


    const [limit, setLimit] = useState(0);
    /// to check the limit
    useEffect(() => {
        fetch(`http://localhost:5000/companyHolder/${user.email}`)
            .then(res => res.json())
            .then(d => {
                setLimit(d.limit)
            })
    }, [])


    const handleRemove = (u1) => {
        fetch(`http://localhost:5000/users/${u1._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : u1.name,
                email : u1.email,
                Date_of_Birth : u1.Date_of_Birth,
                role : u1.role,
                Profile_image : u1.Profile_image,
                Company_name: null,
                Company_logo: u1.Company_logo
            })
        })
            .then(res => res.json())
            .then(updatedUser => {
                const remaining = users.filter(user1 => user1._id !== u1._id)
                setUsers(remaining);
                console.log(updatedUser)

                // Decrease the limit by 1 locally
                
                setEmployee(prev => prev - 1)

                // Decrease the employee count on the server-side
                fetch(`http://localhost:5000/companyHolder/${u1.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        limit: limit,
                        Employee_count : employee - 1 
                    })
                })
                    .then(res => res.json())
                    .then(updatedLimit => {
                        // Optionally update state or handle the updated limit response
                        console.log('Limit updated on the server:', updatedLimit);
                    })
                    .catch(error => console.error('Error updating limit:', error));
            })
            .catch(error => console.error('Error updating user:', error));
    };





    return (
        <div>
            <div className="text-center pt-10">
                <h3 className="text-2xl font-semibold">Number of the Employees : {employee}</h3>
            </div>
            <div>
                <div className="flex justify-center items-center py-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="">
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}


                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </td>
                                            <td>
                                                <img src={user.Profile_image} alt="Avatar Tailwind CSS Component " className="w-[60px] flex justify-center" />

                                            </td>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>
                                                <button onClick={() => handleRemove(user)} className="py-1 px-2 bg-purple-800 text-white rounded-lg">Remove From Team</button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No employee in the company</td>
                                    </tr>
                                )}



                            </tbody>
                            {/* foot */}



                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;