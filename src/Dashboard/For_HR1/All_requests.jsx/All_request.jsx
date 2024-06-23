import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";

const AllRequest = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAndSortedAssets = assets.filter(asset => {
        const emailMatch = asset.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
        return emailMatch;
    });

    if (loading) {
        return <p>Loading assets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Helmet>
                <title>All Requests</title>
            </Helmet>
            <div className="md:text-center">
                <div className="my-7">
                    <input
                        type="text"
                        placeholder="Search by Email..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {filteredAndSortedAssets.length > 0 ? (
                        filteredAndSortedAssets.map(asset => (
                            <RequestCard 
                                key={asset._id} 
                                asset={asset} 
                                onDelete={handleDelete} 
                                onUpdate={handleUpdate} 
                            />
                        ))
                    ) : (
                        <p>No assets found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllRequest;
