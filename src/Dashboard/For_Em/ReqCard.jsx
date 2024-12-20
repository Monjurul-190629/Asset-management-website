import Swal from "sweetalert2";

const ReqCard = ({ asset, onDelete }) => {
    const { _id, Asset_image, Asset_name, Asset_type, requestDate, requestStatus, ApprovalDate } = asset;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://service-provider-website-server.vercel.app/requestAsset/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Rejected!",
                                text: "This request has been cancelled.",
                                icon: "success",
                            });
                            onDelete();
                        }
                    })
                    .catch((error) => console.error("Error deleting request:", error));
            }
        });
    };

    return (
        <div className="p-3 sm:p-5">
            <div className="bg-blue-200 border-2 py-3 px-3 border-blue-500 rounded-lg">
                <div className="card bg-blue-600 text-white shadow-2xl hover:duration-700 hover:-translate-y-2 transition-transform">
                    <figure className="px-3 sm:px-5 pt-3 sm:pt-5">
                        <img 
                            src={Asset_image} 
                            alt="product" 
                            className="rounded-xl w-full h-[180px] sm:h-[200px] object-cover" 
                        />
                    </figure>
                    <div className="card-body text-left p-4 sm:p-6">
                        <h2 className="card-title underline text-lg sm:text-xl font-semibold">
                            {Asset_name}
                        </h2>
                        <div className="pt-1">
                            <h3>
                                <span className="font-semibold text-base sm:text-lg">Type:</span> {Asset_type}
                            </h3>
                        </div>
                        <div className="pt-1">
                            <h3>
                                <span className="font-semibold text-base sm:text-lg">Date:</span> {requestDate}
                            </h3>
                        </div>
                        <div className="pt-1">
                            <h3>
                                <span className="font-semibold text-base sm:text-lg">Approval Date:</span> {ApprovalDate}
                            </h3>
                        </div>
                        <div className="pt-1">
                            <h3>
                                <span className="font-semibold text-base sm:text-lg">Status:</span> {requestStatus}
                            </h3>
                        </div>
                        {requestStatus === "pending" && (
                            <div className="flex justify-end mt-3">
                                <button 
                                    className="btn btn-sm sm:btn-md bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-1 px-3"
                                    onClick={() => handleDelete(_id)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReqCard;
