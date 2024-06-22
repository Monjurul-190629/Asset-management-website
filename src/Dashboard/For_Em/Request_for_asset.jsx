import { useEffect, useState } from "react";
import AssetItem from "./AssetItem";


const Request_for_asset = () => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
 

    useEffect(() => {
        fetch('http://localhost:5000/assets')
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
    }, []);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStockFilterChange = (e) => {
        setStockFilter(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
    };

    

    // Filter and sort assets based on current state
    const filteredAndSortedAssets = assets.filter(asset => {
        const nameMatch = asset.Product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const stockMatch = stockFilter === "all" || (stockFilter === "available" && asset.Product_Quantity > 0) || (stockFilter === "out-of-stock" && asset.Product_Quantity === 0);
        const typeMatch = typeFilter === "all" || (typeFilter === "returnable" && asset.Product_type === "Returnable") || (typeFilter === "non-returnable" && asset.Product_type === "Non-returnable");

        return nameMatch && stockMatch && typeMatch;
    })

    if (loading) {
        return <p>Loading assets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <div>
                <div className="md:text-center">
                    <div className="my-7">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-7">
                        <label className="mr-2 font-semibold">Stock Status:</label>
                        <select value={stockFilter} onChange={handleStockFilterChange}>
                            <option value="all">All</option>
                            <option value="available">Available</option>
                            <option value="out-of-stock">Out of Stock</option>
                        </select>
                        <label className="ml-4 mr-2 font-semibold">Asset Type:</label>
                        <select value={typeFilter} onChange={handleTypeFilterChange}>
                            <option value="all">All</option>
                            <option value="returnable">Returnable</option>
                            <option value="non-returnable">Non-returnable</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {filteredAndSortedAssets.length > 0 ? (
                            filteredAndSortedAssets.map(asset => (
                                <AssetItem key={asset._id} asset={asset}  />
                            ))
                        ) : (
                            <p>No assets found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request_for_asset;