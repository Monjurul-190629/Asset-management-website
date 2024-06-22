import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";

const AssetItem = ({ asset }) => {
    const { Product_name, Product_type, Product_Quantity, Asset_image } = asset;
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [data, setData] = useState('');

    /// load data
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setData(data))
        }

    }, [])


    

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
            Asset_image : Asset_image,
            Asset_name : Product_name,
            Asset_type : Product_type,
            useName : data.name,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            additionalNotes: additionalNotes,
            requestStatus : 'pending'
        };

        // Make the API call to submit the request (replace the URL with your API endpoint)
        fetch('http://localhost:5000/requestAsset', {
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

    return (
        <div>
            <div className="card bg-purple-800 text-white shadow-2xl">
                <figure className="px-10 pt-10">
                    <img src={Asset_image} alt="product" className="rounded-xl w-[350px] h-[200px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title underline">{Product_name}!</h2>
                    <div className="flex justify-evenly gap-10 items-center pt-5">
                        <h3><span className="font-semibold text-[18px]">Type:</span> {Product_type}</h3>
                        <h3><span className="font-semibold text-[18px]">Quantity:</span> {Product_Quantity}</h3>
                    </div>
                    <div className="py-6">
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
