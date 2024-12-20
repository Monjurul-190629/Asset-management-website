import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SectionTitle from "../../../Shared/SectionTitle";
import RequestCard from "../All_requests.jsx/RequestCard";
import AssetCard from "../../For_HR/Add_an_asset/AssestList.jsx/AssetCard";
import ThankYouComponent from "./ThankYouComponent";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";

const Home1 = () => {
    const [assets, setAssets] = useState([]);
    const [assets1, setAssets1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pieData, setPieData] = useState([]);

    const { user } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    useEffect(() => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name);
            fetchAssets1(data.Company_name);
            fetchChartData(data.Company_name);
        }
    }, [data]);

    const fetchAssets = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/requestAsset')
            .then(res => res.json())
            .then(dat => {
                const filtered = dat.filter(asset => asset.Company_name === companyName);
                setAssets(filtered);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    const fetchAssets1 = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/assets')
            .then(res => res.json())
            .then(dat => {
                const filtered = dat.filter(asset => asset.Company_name === companyName && asset.Product_Quantity < 10 && asset.Product_Quantity >= 0);
                setAssets1(filtered);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    const fetchChartData = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/assets')
            .then(res => res.json())
            .then(dat => {
                const filtered = dat.filter(asset => asset.Company_name === companyName);
                const returnableCount = filtered.filter(asset => asset.Product_type === 'Returnable').length;
                const nonReturnableCount = filtered.filter(asset => asset.Product_type === 'Non-returnable').length;

                setPieData([
                    { name: 'Returnable', value: returnableCount },
                    { name: 'Non-Returnable', value: nonReturnableCount },
                ]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    const COLORS = ['rgb(240, 90, 120)', 'rgb(100, 10, 220)'];

    if (loading) {
        return <p className="text-center text-lg">Loading assets...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 text-lg">Error: {error}</p>;
    }

    return (
        <div className="px-3 md:px-8">
            <Helmet>
                <title>Home</title>
            </Helmet>

            {/* Pending Requests Section */}
            <SectionTitle heading={`Pending Requests: ${assets.length}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {assets.slice(0, 5).map(asset => (
                    <RequestCard
                        key={asset._id}
                        asset={asset}
                        onDelete={() => fetchAssets(data.Company_name)}
                    />
                ))}
            </div>

            {/* Limited Stock Items Section */}
            <SectionTitle heading={`Limited Stock Items: ${assets1.length}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {assets1.slice(0, 5).map(asset => (
                    <AssetCard
                        key={asset._id}
                        asset={asset}
                        onDelete={() => fetchAssets1(data.Company_name)}
                        onUpdate={() => fetchAssets1(data.Company_name)}
                    />
                ))}
            </div>

            {/* Pie Chart Section */}
            <div className="my-12">
                <h2 className="text-center text-3xl font-semibold mb-4">Product Type Distribution</h2>
                <div className="flex flex-col-reverse md:flex-row items-center gap-6 bg-blue-100 p-6 rounded-lg">
                    <p className="text-sm md:w-1/2 text-justify">
                        The Returnable and Non-Returnable Asset section in an asset management website provides a clear visualization of asset classifications, helping users efficiently track and manage resources. Returnable assets are items expected to be returned after use, such as tools or equipment, while Non-Returnable assets are consumable items or products that are not reclaimed, like stationery or disposable supplies. This section empowers organizations to optimize asset utilization and monitor accountability effectively.
                    </p>
                    <div className="w-full md:w-1/2" style={{ height: 400 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={140}
                                    label
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Thank You Section */}
            <div className="my-12">
                <ThankYouComponent />
            </div>
        </div>
    );
};

export default Home1;
