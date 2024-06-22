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
                fetch(`http://localhost:5000/assets/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "This card has been deleted.",
                                icon: "success"
                            })

                            onDelete();
                            
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="card bg-gray-500 text-white shadow-2xl">
                <figure className="px-10 pt-10">
                    <img src={Asset_image} alt="product" className="rounded-xl w-[350px] h-[200px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title underline">{Product_name}!</h2>
                    <div className="flex justify-evenly gap-5 items-center">
                        <h3><span className="font-semibold text-[18px]">Type:</span> {Product_type}</h3>

                    </div>
                    <div className="flex gap-10">
                        <h3><span className="font-semibold text-[18px]">Quantity:</span> {Product_Quantity}</h3>
                        <h3><span className="font-semibold text-[18px]">Date:</span> {Date_added}</h3>
                    </div>
                    <div className="card-actions flex gap-10 pt-6">
                        <Link to = {`/Dashboard/UpdateData/${_id}`}><button className="btn btn-primary btn-md">Update</button></Link>
                        <button className="btn btn-primary btn-md" onClick={() => handleDelete(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;