import { useState } from "react";
import Swal from "sweetalert2";

const RequestCard = ({ asset, onDelete }) => {
    const { _id, Asset_image, Asset_name, Asset_type, useName, userEmail, requestDate, additionalNotes, requestStatus } = asset;

    const [status, setStatus] = useState(requestStatus);

    const handleUpdate = () => {
        const fullData = {
            _id,
            Asset_image,
            Asset_name,
            Asset_type,
            useName,
            userEmail,
            requestDate,
            additionalNotes,
            requestStatus: "Approved",
            ApprovalDate :  new Date().toISOString()
        };

        fetch(`http://localhost:5000/requestAsset/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(fullData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                setStatus('Approved');
                Swal.fire({
                    title: 'Success!',
                    text: 'Updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            }
        })
        .catch(error => console.error('Error updating request:', error));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/requestAsset/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Rejected!",
                            text: "This request has been rejected.",
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
            <div className="card bg-blue-800 text-white shadow-2xl">
                <figure className="px-10 pt-10">
                    <img src={Asset_image} alt="product" className="rounded-xl w-[350px] h-[200px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title underline">{Asset_name}!</h2>
                    <div className="flex justify-evenly gap-5 items-center">
                        <h3><span className="font-semibold text-[18px]">Type:</span> {Asset_type}</h3>
                        <h3><span className="font-semibold text-[18px]">Status:</span> {status}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3><span className="font-semibold text-[18px]">Requester :</span> {useName}</h3>
                        <h3><span className="font-semibold text-[18px]">Requester's email:</span> {userEmail}</h3>
                        <h3><span className="font-semibold text-[18px]">Additional Note:</span> {additionalNotes}</h3>
                        <h3><span className="font-semibold text-[18px]">Request_Date:</span> {requestDate}</h3>
                    </div>
                    <div className="flex justify-center items-center gap-10 py-5">
                        <button className="btn bg-white text-black" onClick={handleUpdate}>Approve</button>
                        <button className="btn bg-white text-black" onClick={() => handleDelete(_id)}>Reject</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
