import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";


const Myteam = () => {

    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const { user } = useAuth();


   

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

    

    
    return (
        <div>
            <Helmet>
                <title>My team</title>
            </Helmet>
            <div className="text-center pt-10">
                <h3 className="text-xl md:text-2xl font-semibold">Total team members: {users.length}</h3>
            </div>
            <div>
                <div className="flex justify-center items-center py-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-[16px] md:text-xl font-semibold text-black">
                                <tr>
                                   
                                    <th>Image</th>
                                    <th>Name</th>
                           
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            
                                            <td>
                                                <img src={user.Profile_image} alt="Avatar Tailwind CSS Component" className="w-[40px] md:w-[60px] flex justify-center" />
                                            </td>
                                            <td className="text-slate-900">{user.name}</td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No man in the Team</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
)};

export default Myteam;