import { useEffect, useState } from "react";
import ReqCard from "./ReqCard";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Myassets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");


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
                const filtered = dat.filter(asset => (asset.Company_name === companyName && asset.userEmail === user.email));
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
        const nameMatch = asset.Asset_name.toLowerCase().includes(searchTerm.toLowerCase());
        const stockMatch = stockFilter === "all" || (stockFilter === "pending" && asset.requestStatus === 'pending') || (stockFilter === "approved" && asset.requestStatus === 'Approved');
        const typeMatch = typeFilter === "all" || (typeFilter === "returnable" && asset.Product_type === "Returnable") || (typeFilter === "non-returnable" && asset.Product_type === "Non-returnable");

        return nameMatch && stockMatch && typeMatch;
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
                <title>My Requested Assets</title>
            </Helmet>
            {data.Company_name && (
                <div className="md:text-center">
                    <div className="my-7 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-7 flex flex-col lg:flex-row justify-center items-center gap-5">
                        <div>
                            <label className="mr-2 font-semibold">Stock Status:</label>
                            <select value={stockFilter} onChange={handleStockFilterChange}>
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                            </select>
                        </div>
                        <div>
                            <label className="ml-4 mr-2 font-semibold">Asset Type:</label>
                            <select value={typeFilter} onChange={handleTypeFilterChange}>
                                <option value="all">All</option>
                                <option value="returnable">Returnable</option>
                                <option value="non-returnable">Non-returnable</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center px-3 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {filteredAndSortedAssets.length > 0 ? (
                        filteredAndSortedAssets.map(asset => (
                            <ReqCard key={asset._id} asset={asset} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>No assets found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Myassets;
