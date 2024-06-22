import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Shared/SectionTitle";
import ReqCard from "./ReqCard";
import CalendarComponent from "./CalendarComponent";
import { Helmet } from "react-helmet";

const Home2 = () => {
    const [assets, setAssets] = useState([]);
    const [assets1, setAssets1] = useState([]);
    const { user } = useAuth();
    const [data, setData] = useState('');

    useEffect(() => {
        if (user && user.email) {
            fetch('http://localhost:5000/users')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching company holder data:', error));
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = () => {
        fetch('http://localhost:5000/requestAsset')
            .then(res => res.json())
            .then(data => setAssets(data))
            .catch(error => console.error('Error fetching assets:', error));
    };

    const handleDelete = () => {
        fetchAssets();
    };

    useEffect(() => {
        if (user && user.email) {
            fetch('http://localhost:5000/requestAsset')
                .then(res => res.json())
                .then(data => {
                    const filtered = data.filter(asset => asset.userEmail === user.email && asset.requestStatus === 'pending');
                    setAssets(filtered);
                })
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email) {
            fetch('http://localhost:5000/requestAsset')
                .then(res => res.json())
                .then(data => {
                    const filtered = data.filter(asset => asset.userEmail === user.email);
                    setAssets1(filtered);
                })
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [user]);

    if (!user || !user.email) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           <div>
                        <Helmet>
                            <title>Home</title>
                        </Helmet>
                        <div>
                            <SectionTitle heading={`My Pending Request:  ${assets.length}`}></SectionTitle>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {assets.map(asset => (
                                    <ReqCard key={asset._id} asset={asset} onDelete={handleDelete} />
                                ))}
                            </div>
                        </div>
                        <div className="pt-20">
                            <SectionTitle heading={`My Monthly Request:  ${assets1.length}`}></SectionTitle>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {assets1.map(asset => (
                                    <ReqCard key={asset._id} asset={asset} onDelete={handleDelete} />
                                ))}
                            </div>
                        </div>
                        <div className="pt-20">
                            <SectionTitle heading="Calendar"></SectionTitle>
                            <CalendarComponent />
                        </div>
                    </div>
        </div>
    );
};

export default Home2;
