import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateData = () => {

    const asset = useLoaderData();

    const { Product_name, Product_Quantity, Asset_image, Product_type, _id, Company_name } = asset;

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
            Product_name, Product_type, Product_Quantity, Asset_image, Date_added, Company_name
        }


        // now fetch
        fetch(`https://service-provider-website-server.vercel.app/assets/${_id}`, {
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
            <Helmet>
                <title>Add an asset</title>
            </Helmet>
            <div className="my-10 py-5 flex justify-center">
                <div className="border-2 border-slate-500 w-[320px] lg:w-[550px] pt-10 md:px-12 rounded-lg">
                    <h2 className="text-center font-semibold text-2xl">Update Asset Data</h2>
                    <div className="flex justify-center pt-5 pb-8 lg:pb-12 mx-10 md:mx-0">
                        <form className="text-justify flex flex-col justify-center items-center gap-10 md:gap-10 font-bold text-gray-900" onSubmit={handleUpdate}>
                            <div className="grid lg:grid-cols-2 gap-10 justify-center items-center">
                                <div className="flex justify-between">
                                    <input type="text" name="Product_name" placeholder="Product name" defaultValue = {Product_name} className="py-2 border-b-2 border-slate-600 placeholder-slate-500 outline-0" required />
                                </div>
                                <div className="flex md:justify-between">
                                    <input type="text" name="Asset_image" placeholder="Asset Image Url" defaultValue = {Asset_image} className="py-2 border-b-2 border-slate-600 placeholder-slate-500 outline-0" required />
                                </div>
                                <div className="flex md:justify-between">
                                    <input type="text" name="Product_type" placeholder="Product Type" defaultValue = {Product_type} className="py-2 border-b-2 border-slate-600 placeholder-slate-500 outline-0" required />
                                </div>
                                <div className="flex justify-between">
                                    <input type="number" name="Product_Quantity" placeholder="Product Quantity" defaultValue = {Product_Quantity} className="py-2 border-b-2 border-slate-600 placeholder-slate-500 outline-0" required />
                                </div>
                            </div>
                            <div className="w-full">
                                <input type="submit" value="ADD" className="w-full py-1 bg-blue-600 text-white rounded-md hover:text-black  hover:bg-transparent hover:border-2 hover:border-black" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateData;