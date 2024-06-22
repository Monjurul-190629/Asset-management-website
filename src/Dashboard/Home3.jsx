import { useEffect, useState } from "react";
import useManager from "../Hooks/useManager";
import Home2 from "./For_Em/Home2";
import Home1 from "./For_HR1/Home/Home1";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";


const Home3 = () => {
    const [isManager] = useManager();
    const [data, setData] = useState([]);
    const {user} = useAuth();
    /// load data
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
        }

    }, [user])
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {
                isManager ? <> <Home1></Home1>
                </> : <>
                {
                    data.Company_name ? <> <Home2></Home2> </> : <>
                    <div className="text-3xl font-semibold text-red-900 pt-20">
                        contact to your manager
                    </div>
                    </>
                }
                </>
                
                
            }
        </div>
    );
};

export default Home3;