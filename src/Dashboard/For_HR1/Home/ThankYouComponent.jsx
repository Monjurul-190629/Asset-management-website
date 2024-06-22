

const ThankYouComponent = () => {
    return (
        <div className="flex justify-center items-center bg-purple-800">
            <div className="container mx-auto mt-8 text-white">
                <div className="bg-purple-800 p-8 rounded-lg shadow-md ">
                    <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
                    <p className="text-lg mb-4">
                        Thank you for choosing <span className="text-xl font-semibold">Sevice-provider-website</span> for your service needs.
                        Your satisfaction is our priority, and we are glad to assist you.
                    </p>
                    <p className="text-white">
                        If you have any further questions or need assistance, please feel free to contact us.
                    </p>
                </div>
            </div>
            <div>
                <img src = "https://static.vecteezy.com/system/resources/previews/000/182/450/original/thank-you-typography-vector.jpg" className="w-[500px]"/>
            </div>
        </div>
    );
};

export default ThankYouComponent;
