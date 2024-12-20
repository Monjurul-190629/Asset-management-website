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
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [user]);

    useEffect(() => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name);
        }
    }, [data]);

    const fetchAssets = (companyName) => {
        fetch("https://service-provider-website-server.vercel.app/requestAsset")
            .then((res) => res.json())
            .then((dat) => {
                const filtered = dat.filter((asset) => asset.Company_name === companyName);
                setAssets(filtered);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching assets:", error);
                setError(error.message);
                setLoading(false);
            });
    };

    const handleDelete = () => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name); 
        }
    };

    const handleUpdate = () => {
        if (data && data.Company_name) {
            fetchAssets(data.Company_name); 
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAndSortedAssets = assets.filter((asset) =>
        asset.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p className="text-center text-lg">Loading assets...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 text-lg">Error: {error}</p>;
    }

    return (
        <div className="px-4 md:px-8">
            <Helmet>
                <title>All Requests</title>
            </Helmet>

            {/* Search Input Section */}
            <div className="flex justify-center my-6">
                <input
                    type="text"
                    placeholder="Search by Email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Asset Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedAssets.length > 0 ? (
                    filteredAndSortedAssets.map((asset) => (
                        <RequestCard
                            key={asset._id}
                            asset={asset}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-lg text-gray-600">
                        No assets found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllRequest;
