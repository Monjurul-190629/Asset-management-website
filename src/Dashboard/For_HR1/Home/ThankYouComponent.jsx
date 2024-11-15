import { Link } from "react-router-dom";


const ThankYouComponent = () => {
    return (
        <div className="flex justify-center items-center bg-blue-700 rounded-lg">
            <div className="container mt-2 text-white">
                <div className="px-20 rounded-lg shadow-md ">
                    <h2 className=" text-2xl lg:text-5xl font-semibold mb-4">Thank You!</h2>
                    <p className="text-xl mb-2">
                        Thank you for choosing <span className="text-xl font-semibold">SeviceSpectrum</span> for your service needs.
                        Your satisfaction is our priority, and we are glad to assist you.
                    </p>
                    <p className="text-white text-[17px]">
                        If you have any further questions or need assistance, please feel free to contact our manager.
                        <Link to="https://aesthetic-mousse-9f2882.netlify.app/">
                            <button className="bg-purple-700 border-2 border-slate-200 py-1 px-4  rounded-lg hover:bg-purple-800 hover:text-white hover:border-2 hover:border-slate-300">
                                Go
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
            <div>
                <img src="https://png.pngtree.com/png-clipart/20221220/original/pngtree-thank-you-text-hand-lettering-png-image_8786056.png" className="w-[500px]" />
            </div>
        </div>
    );
};

export default ThankYouComponent;
