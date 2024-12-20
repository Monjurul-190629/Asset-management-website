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
            fetch('https://service-provider-website-server.vercel.app/users')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching company holder data:', error));
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = () => {
        fetch('https://service-provider-website-server.vercel.app/requestAsset')
            .then(res => res.json())
            .then(data => setAssets(data))
            .catch(error => console.error('Error fetching assets:', error));
    };

    const handleDelete = () => {
        fetchAssets();
    };

    useEffect(() => {
        if (user && user.email) {
            fetch('https://service-provider-website-server.vercel.app/requestAsset')
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
            fetch('https://service-provider-website-server.vercel.app/requestAsset')
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
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="px-4 md:px-8 lg:px-12 xl:px-20">
                <div>
                    <SectionTitle heading={`My Pending Request: ${assets.length}`} />
                </div>
                <div className="flex justify-center items-center px-2 md:px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
                        {assets.map(asset => (
                            <ReqCard key={asset._id} asset={asset} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="pt-16">
                    <SectionTitle heading={`My Monthly Request: ${assets1.length}`} />
                </div>
                <div className="flex justify-center items-center px-2 md:px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
                        {assets1.map(asset => (
                            <ReqCard key={asset._id} asset={asset} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="pt-16">
                    <SectionTitle heading="Calendar" />
                    <div className="mt-8">
                        <CalendarComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home2;
