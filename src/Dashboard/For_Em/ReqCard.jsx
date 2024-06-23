import Swal from "sweetalert2";



const ReqCard = ({ asset, onDelete }) => {
    const { _id, Asset_image, Asset_name, Asset_type,  requestDate,  requestStatus, ApprovalDate } = asset;

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
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Rejected!",
                            text: "This request has been cancelled.",
                            icon: "success"
                        });

                        onDelete();
                    }
                })
                .catch(error => console.error('Error deleting request:', error));
            }
        });
    };








    return (
        <div>
            <div className="card bg-purple-800 text-white shadow-2xl">
                <figure className="px-10 pt-10">
                    <img src={Asset_image} alt="product" className="rounded-xl w-[350px] h-[200px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title underline">{Asset_name}!</h2>
                    <div className="flex justify-evenly gap-10 items-center pt-5">
                        <h3><span className="font-semibold text-[18px]">Type:</span> {Asset_type}</h3>
                    </div>

                    <div className="flex justify-evenly gap-7 items-center pt-5">
                        <h3><span className="font-semibold text-[18px]">Request_Date:</span> {requestDate}</h3>
                    </div>

                    <div className="flex justify-evenly gap-7 items-center pt-5">
                        <h3><span className="font-semibold text-[18px]">Approval_Date:</span> {ApprovalDate}</h3>
                    </div>

                    <div className="flex justify-evenly gap-7 items-center pt-5">
                        <h3><span className="font-semibold text-[18px]">Status:</span> {requestStatus}</h3>
                        {
                            requestStatus === 'pending' ? (
                                <>
                                   <button className="btn" onClick={() => handleDelete(_id)}>
                                    Cancel
                                   </button>
                                </>
                            ) : (
                                // Content to render if requestStatus is not 'pending'
                                <></>
                            )
                        }
                    </div>


                </div>
            </div>


        </div>
    );
};

export default ReqCard;
