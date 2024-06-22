import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SectionTitle from "../../../Shared/SectionTitle";
import RequestCard from "../All_requests.jsx/RequestCard";
import AssetCard from "../../For_HR/Add_an_asset/AssestList.jsx/AssetCard";
import CalendarComponent from "../../For_Em/CalendarComponent";
import ThankYouComponent from "./ThankYouComponent";

const Home1 = () => {
    const [assets, setAssets] = useState([]);
    const [assets1, setAssets1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [returnableItems, setReturnableItems] = useState(0);
    const [nonReturnableItems, setNonReturnableItems] = useState(0);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = () => {
        setLoading(true);
        fetch('http://localhost:5000/requestAsset')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch assets');
                }
                return res.json();
            })
            .then(data => {
                setAssets(data);
                calculateReturnable(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    const handleDelete = () => {
        fetchAssets(); // Re-fetch assets after deletion
    };

    const handleUpdate = () => {
        fetchAssets(); // Re-fetch assets after an update
    };

    useEffect(() => {
        fetch('http://localhost:5000/requestAsset')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(asset => asset.requestStatus === 'pending');
                setAssets(filtered);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/assets')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(asset => (asset.Product_Quantity > 0 && asset.Product_Quantity < 10));
                setAssets1(filtered);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const calculateReturnable = (data) => {
        const returnable = data.filter(asset => asset.Product_type === 'Returnable').length;
        const nonReturnable = data.filter(asset => asset.Product_type === 'Non-returnable').length;
        setReturnableItems(returnable);
        setNonReturnableItems(nonReturnable);
        console.log("Returnable Items:", returnable);
        console.log("Non-Returnable Items:", nonReturnable);
    };

    const pieData = [
        { name: 'Returnable', value: returnableItems },
        { name: 'Non-Returnable', value: nonReturnableItems },
    ];

    console.log("Pie Data:", pieData);

    const COLORS = ['#0088FE', '#FF8042'];

    if (loading) {
        return <p>Loading assets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
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
            <div className="pt-20">
                <SectionTitle heading="Returnable vs Non-Returnable Items"></SectionTitle>
                <div className="flex justify-center items-center" style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
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
                <div className="pt-20">
                    <SectionTitle heading="Calendar"></SectionTitle>
                    <CalendarComponent />
                </div>
                <div className="pt-20">
                   <ThankYouComponent></ThankYouComponent>
                </div>
            </div>
        </div>
    );
};

export default Home1;
