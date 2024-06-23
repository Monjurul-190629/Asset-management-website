import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet";


const Package = () => {
    return (
        <div className="mt-20">
            <Helmet>
                <title>Package</title>
            </Helmet>
            <SectionTitle heading={'Package'}></SectionTitle>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                <div className="card w-96 bg-purple-400 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://healingspringswellness.com/wp-content/uploads/2020/12/AdobeStock_354245058.jpeg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-3xl font-bold">$5</h2>
                        <p className="text-xl font-semibold">To add 5 employees you have to pay only $5 dollars.</p>
                        <div className="card-actions mt-2">
                            <Link to="/Dashboard/payment?value=1">
                                <button className="bg-purple-800 px-5 py-1 rounded-lg text-white font-semibold">Buy</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-purple-400 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://online.campbellsville.edu/wp-content/uploads/Employe-Eengagement-Ideas-CU.jpg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-3xl font-bold">$8</h2>
                        <p className="text-xl font-semibold">To add 10 employees you have to pay only $8 dollars.</p>
                        <div className="card-actions mt-2">
                            <Link to="/Dashboard/payment?value=2">
                                <button className="bg-purple-800 px-5 py-1 rounded-lg text-white font-semibold">Buy</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-purple-400 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="http://www.cardbc.com/employment-opportunities.jpg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-3xl font-bold">$15</h2>
                        <p className="text-xl font-semibold">To add 20 employees you have to pay only $15 dollars.</p>
                        <div className="card-actions mt-2">
                            <Link to="/Dashboard/payment?value=3">
                                <button className="bg-purple-800 px-5 py-1 rounded-lg text-white font-semibold">Buy</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;