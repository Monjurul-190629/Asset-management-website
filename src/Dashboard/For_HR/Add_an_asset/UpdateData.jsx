import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateData = () => {

    const asset = useLoaderData();

    const { Product_name, Product_Quantity, Asset_image, Product_type, _id } = asset;

    const handleUpdate = e => {
        e.preventDefault();
        const Product_name = e.target.Product_name.value;
        const Product_type = e.target.Product_type.value;
        const Product_Quantity = e.target.Product_Quantity.value;
        const Asset_image = e.target.Asset_image.value;
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const Date_added = `${year}-${month}-${day}`
        console.log(Date_added)
        const fullData = {
            Product_name, Product_type, Product_Quantity, Asset_image, Date_added
        }


        // now fetch
        fetch(`http://localhost:5000/assets/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(fullData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }


    return (
        <div>
            <div>
                <div className="bg-purple-400 my-20 py-10 rounded-3xl">
                    <h2 className="text-center font-bold text-3xl">Update an Asset</h2>
                    <div className="flex justify-center py-10 mx-10 md:mx-0">
                        <form className="text-justify grid md:grid-cols-2 gap-10 md:gap-20 font-bold text-gray-900" onSubmit={handleUpdate}>

                            <div className="flex justify-between">
                                <label>Product name: </label>
                                <input type="text" name="Product_name" defaultValue={Product_name} className="py-2 px-2 rounded-md" />
                            </div>
                            <div className="flex md:justify-between">
                                <label>Image URL:</label>
                                <input type="text" name="Asset_image" defaultValue={Asset_image} className="py-2 px-2 rounded-md" />
                            </div>
                            <div className="flex md:justify-between">
                                <label>Product type:</label>
                                <input type="text" name="Product_type" defaultValue={Product_type} className="py-2 px-2 rounded-md" />
                            </div>


                            <div className="flex justify-between">
                                <label>Product Quantity: </label>
                                <input type="number" name="Product_Quantity" defaultValue={Product_Quantity} className="py-2 px-2 rounded-md" />
                            </div>

                            <input type="submit" value="UPDATE" className="w-full bg-slate-300 rounded-md hover:text-white hover:bg-transparent hover:border-2 hover:border-white" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateData;