

const RequestCard = ({asset}) => {


    const {  Product_name, Product_type, Product_Quantity, Date_added, Asset_image } = asset;



    return (
        <div>
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
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;