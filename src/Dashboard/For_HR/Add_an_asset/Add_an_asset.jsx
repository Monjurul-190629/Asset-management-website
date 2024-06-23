import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";

const Add_an_asset = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://service-provider-website-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (!user || !user.email || !data) {
        return <p>Unable to load data. Please try again.</p>;
    }

    const handleAdd = e => {
        e.preventDefault();
        const Product_name = e.target.Product_name.value;
        const Product_type = e.target.Product_type.value;
        const Product_Quantity = e.target.Product_Quantity.value;
        const Asset_image = e.target.Asset_image.value;
        const Company_name = data.Company_name;
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const Date_added = `${year}-${month}-${day}`;
        console.log(Date_added);
        const fullData = {
            Product_name, Product_type, Product_Quantity, Asset_image, Date_added, Company_name
        };

        fetch('https://service-provider-website-server.vercel.app/assets', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(fullData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Added successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            });
    }

    return (
        <div>
            <Helmet>
                <title>Add an asset</title>
            </Helmet>
            <div className="bg-purple-400 my-20 py-10 rounded-3xl">
                <h2 className="text-center font-bold text-3xl">Add an Asset</h2>
                <div className="flex justify-center py-10 mx-10 md:mx-0">
                    <form className="text-justify grid md:grid-cols-2 gap-10 md:gap-20 font-bold text-gray-900" onSubmit={handleAdd}>
                        <div className="flex justify-between">
                            <label>Product name: </label>
                            <input type="text" name="Product_name" className="py-2 px-2 rounded-md" required />
                        </div>
                        <div className="flex md:justify-between">
                            <label>Image URL:</label>
                            <input type="text" name="Asset_image" className="py-2 px-2 rounded-md" required />
                        </div>
                        <div className="flex md:justify-between">
                            <label>Product type:</label>
                            <input type="text" name="Product_type" className="py-2 px-2 rounded-md" required />
                        </div>
                        <div className="flex justify-between">
                            <label>Product Quantity: </label>
                            <input type="number" name="Product_Quantity" className="py-2 px-2 rounded-md" required />
                        </div>
                        <input type="submit" value="ADD" className="w-full bg-slate-300 rounded-md hover:text-white hover:bg-transparent hover:border-2 hover:border-white" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_an_asset;
