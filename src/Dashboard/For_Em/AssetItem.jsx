import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";

const AssetItem = ({ asset }) => {
    const { Product_name, Product_type, Product_Quantity, Asset_image } = asset;
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        if (user) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false); // Also set loading to false in case of error
                });
        }
    }, [user]);

    const handleRequestClick = () => {
        if (Product_Quantity > 0) {
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setAdditionalNotes("");
    };

    const handleRequestSubmit = () => {
        const requestData = {
            Asset_image: Asset_image,
            Asset_name: Product_name,
            Asset_type: Product_type,
            useName: data.name,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            additionalNotes: additionalNotes,
            requestStatus: 'pending',
            Company_name: data.Company_name
        };

        fetch('https://service-provider-website-server.vercel.app/requestAsset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Request submitted:', data);
                handleModalClose();
            })
            .catch(error => console.error('Error submitting request:', error));
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!data) {
        return <div>No data available</div>; // Show message if data is not available
    }

    return (
        <div>
            <div className="bg-blue-200 border-2 border-slate-600 rounded-lg px-4 py-4">
                <div className="card bg-blue-800 text-white shadow-2xl px-3 py-2 ">
                    <figure className="px-5 pt-5">
                        <img src={Asset_image} alt="product" className="rounded-xl w-[300px] h-[200px]" />
                    </figure>
                    <div className="card-body text-justify">
                        <h2 className="card-title underline">{Product_name}!</h2>
                        <div className="text-justify pt-5">
                            <h3><span className="font-semibold text-[18px]">Type:</span> {Product_type}</h3>
                            <h3><span className="font-semibold text-[18px]">Quantity:</span> {Product_Quantity}</h3>
                        </div>
                        <div className="py-1">
                            <button
                                className="btn"
                                onClick={handleRequestClick}
                                disabled={Product_Quantity === 0}
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl mb-4">Request {Product_name}</h2>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Additional notes"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button className="btn btn-secondary mr-2" onClick={handleModalClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleRequestSubmit}>Submit Request</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetItem;
