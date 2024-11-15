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
                            })

                            onDelete();

                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="card bg-blue-200 border-2 border-slate-500 text-white shadow-2xl px-5 py-5">
                <div className="bg-blue-700 rounded-lg hover:duration-700 hover:-translate-y-5">
                    <figure className="px-6 pt-6">
                        <img src={Asset_image} alt="product" className="rounded-xl w-[280px] h-[200px]" />
                    </figure>
                    <div className="card-body text-justify font-normal">
                        <h2 className="card-title flex justify-center text-2xl font-bold -mt-5">{Product_name}</h2>
                        <div className=" items-center">
                            <h3><span className="font-semibold text-[18px] -mt-7">Type:</span> {Product_type}</h3>
                        </div>
                        <div className="">
                            <h3><span className="font-semibold text-[18px] -mt-3">Quantity:</span> {Product_Quantity}</h3>

                        </div>
                        <div className="">
                            <h3><span className="font-semibold text-[18px] -mt-3">Date:</span> {Date_added}</h3>
                        </div>
                        <div className="card-actions flex gap-5 pt-2">
                            <Link to={`/Dashboard/UpdateData/${_id}`}><button className="btn btn-primary btn-md">Update</button></Link>
                            <button className="btn btn-primary btn-md" onClick={() => handleDelete(_id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;