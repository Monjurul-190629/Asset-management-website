import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";

const AllRequest = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
