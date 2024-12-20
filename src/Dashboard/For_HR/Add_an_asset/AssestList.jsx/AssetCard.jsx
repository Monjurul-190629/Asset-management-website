import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AssetCard = ({ asset, onDelete }) => {
    const { _id, Product_name, Product_type, Product_Quantity, Date_added, Asset_image } = asset;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://service-provider-website-server.vercel.app/assets/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "This card has been deleted.",
                                icon: "success"
                            });

                            onDelete();
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="card bg-blue-200 border-2 border-slate-500 text-white shadow-2xl px-5 py-5">
                <div className="bg-blue-700 rounded-lg hover:duration-700 hover:-translate-y-5">
                    <figure className="px-6 pt-6">
                        <img 
                            src={Asset_image} 
                            alt="product" 
                            className="w-full h-[200px] sm:h-[250px] md:h-[200px] rounded-lg object-cover" 
                        />
                    </figure>
                    <div className="card-body text-justify font-normal">
                        <h2 className="card-title flex justify-center text-2xl font-bold -mt-5">{Product_name}</h2>
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">Type: <span className="font-normal">{Product_type}</span></h3>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">Quantity: <span className="font-normal">{Product_Quantity}</span></h3>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">Date: <span className="font-normal">{Date_added}</span></h3>
                        </div>
                        <div className="card-actions flex flex-col sm:flex-row gap-5 pt-4">
                            <Link to={`/Dashboard/UpdateData/${_id}`} className="w-full sm:w-auto">
                                <button className="btn btn-primary btn-md w-full sm:w-auto">Update</button>
                            </Link>
                            <button 
                                className="btn btn-primary btn-md w-full sm:w-auto" 
                                onClick={() => handleDelete(_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;
