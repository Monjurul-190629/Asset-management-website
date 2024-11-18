import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
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
        }
    }, [data]);



    const fetchAssets = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/requestAsset')
            .then(res => res.json())
            .then(dat => {
                const filtered = dat.filter(asset => asset.Company_name === companyName);
                setAssets(filtered);
                console.log(filtered)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (data && data.Company_name) {
            fetchAssets1(data.Company_name);
            fetchc(data.Company_name)
        }
    }, [data]);

    const fetchAssets1 = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/assets')
            .then(res => res.json())
            .then(dat => {
                const filtered = dat.filter(asset => (asset.Company_name === companyName && asset.Product_Quantity < 10 && asset.Product_Quantity >= 0));
                setAssets1(filtered);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };







    const handleDelete = () => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name); // Example: You may need to implement logic to update assets state
        }
    };

    const handleUpdate = () => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name); // Example: You may need to implement logic to update assets state
        } // Re-fetch assets after an update
    };



    const fetchc = (companyName) => {
        fetch('https://service-provider-website-server.vercel.app/assets')
            .then((res) => res.json())
            .then((dat) => {
                const filtered = dat.filter(
                    (asset) => asset.Company_name === companyName
                );


                // Categorize assets based on Product_type
                const returnableCount = filtered.filter(
                    (asset) => asset.Product_type === 'Returnable'
                ).length;
                const nonReturnableCount = filtered.filter(
                    (asset) => asset.Product_type === 'Non-returnable'
                ).length;

                console.log(returnableCount)
                console.log(nonReturnableCount)
                // Prepare pie chart data
                const chartData = [
                    { name: 'Returnable', value: returnableCount },
                    { name: 'Non-Returnable', value: nonReturnableCount },
                ];
                setPieData(chartData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };










    const COLORS = ['rgb(240, 90, 120)', 'rgb(100, 10, 220)'];



    if (loading) {
        return <p>Loading assets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div>
                <SectionTitle heading={`Pending Request : ${assets.length}`} ></SectionTitle>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {
                        assets.slice(0, 5).map(asset => (
                            <RequestCard
                                key={asset._id}
                                asset={asset}
                                onDelete={handleDelete}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="pt-20">
                <SectionTitle heading={`Limited Stock Items : ${assets1.length}`}></SectionTitle>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {
                        assets1.slice(0, 5).map(asset => (
                            <AssetCard
                                key={asset._id}
                                asset={asset}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        ))
                    }
                </div>
            </div>



            <div className="flex justify-center font-serif pt-20 text-3xl font-normal mb-2">
                Product Type
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-0 bg-blue-100 text-[16px] rounded-lg text-black">
                <div className="w-5/6 lg:ml-60 text-justify">
                The Returnable and Non-Returnable Asset section in an asset management website provides a clear visualization of asset classifications, helping users efficiently track and manage resources. Returnable assets are items expected to be returned after use, such as tools or equipment, while Non-Returnable assets are consumable items or products that are not reclaimed, like stationery or disposable supplies. This section empowers organizations to optimize asset utilization and monitor accountability effectively.
                </div>
                <div className=" " style={{ width: '100%', height: 400 }}>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={140}
                                fill="#8884d8"
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
            <div className="pt-2">
                <div className="pt-20">
                    <ThankYouComponent></ThankYouComponent>
                </div>
            </div>
        </div>
    );
};

export default Home1;
