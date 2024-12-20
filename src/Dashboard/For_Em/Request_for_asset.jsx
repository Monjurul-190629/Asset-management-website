import { useEffect, useState } from "react";
import AssetItem from "./AssetItem";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";

const Request_for_asset = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [data, setData] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    useEffect(() => {
        if (data?.Company_name) {
            fetch("https://service-provider-website-server.vercel.app/assets")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch assets");
                    }
                    return res.json();
                })
                .then((data) => {
                    setAssets(data);
                })
                .catch((error) => {
                    console.error("Error fetching assets:", error);
                    setError(error.message);
                });
        }
    }, [data?.Company_name]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStockFilterChange = (e) => {
        setStockFilter(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
    };

    const filteredAndSortedAssets = assets.filter((asset) => {
        const nameMatch = asset.Product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const stockMatch =
            stockFilter === "all" ||
            (stockFilter === "available" && asset.Product_Quantity > 0) ||
            (stockFilter === "out-of-stock" && asset.Product_Quantity === 0);
        const typeMatch =
            typeFilter === "all" ||
            (typeFilter === "returnable" && asset.Product_type === "Returnable") ||
            (typeFilter === "non-returnable" && asset.Product_type === "Non-returnable");

        return nameMatch && stockMatch && typeMatch;
    });

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">Error: {error}</p>;
    }

    return (
        <div className="px-3 md:px-10">
            <Helmet>
                <title>Request for an Asset</title>
            </Helmet>
            <div className="my-7">
                <div className="flex flex-col items-center gap-5">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full sm:w-3/4 lg:w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
                        <div>
                            <label className="mr-2 font-semibold">Stock Status:</label>
                            <select
                                value={stockFilter}
                                onChange={handleStockFilterChange}
                                className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                                <option value="all">All</option>
                                <option value="available">Available</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>
                        <div>
                            <label className="mr-2 font-semibold">Asset Type:</label>
                            <select
                                value={typeFilter}
                                onChange={handleTypeFilterChange}
                                className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                                <option value="all">All</option>
                                <option value="returnable">Returnable</option>
                                <option value="non-returnable">Non-returnable</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredAndSortedAssets.length > 0 ? (
                            filteredAndSortedAssets.map((asset) => (
                                <AssetItem key={asset._id} asset={asset} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No assets found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request_for_asset;
