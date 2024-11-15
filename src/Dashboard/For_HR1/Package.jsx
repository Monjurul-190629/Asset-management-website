import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet";


const Package = () => {
    return (
        <div className="mt-20">
            <Helmet>
                Package
            </Helmet>
            <SectionTitle heading={'Package'}></SectionTitle>
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">

                <div className="border-2 border-slate-400 px-4 py-4 rounded-lg bg-blue-200">
                    <div className="card w-80 md:w-[340px] bg-indigo-700 text-white shadow-xl hover:-translate-y-12 transition duration-700">
                        <figure className="px-7 pt-10">
                            <img src="https://healingspringswellness.com/wp-content/uploads/2020/12/AdobeStock_354245058.jpeg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$5</h2>
                            <p className="text-[18px]">To add 5 employees you have to pay only $5 dollars.</p>
                            <div className="card-actions mt-1">
                                <Link to="/Dashboard/payment?value=3">
                                    <button className="bg-purple-200 px-5 py-1 rounded-lg text-black hover:bg-purple-300 font-semibold">Buy</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-slate-400 px-4 py-4 rounded-lg bg-blue-200">
                    <div className="card w-80 md:w-[340px] bg-indigo-700 text-white shadow-xl hover:-translate-y-12 transition duration-700">
                        <figure className="px-7 pt-10">
                            <img src="https://online.campbellsville.edu/wp-content/uploads/Employe-Eengagement-Ideas-CU.jpg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$8</h2>
                            <p className="text-[18px]">To add 10 employees you have to pay only $8 dollars.</p>
                            <div className="card-actions mt-1">
                                <Link to="/Dashboard/payment?value=3">
                                    <button className="bg-purple-200 px-5 py-1 rounded-lg text-black hover:bg-purple-300 font-semibold">Buy</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-2 border-slate-400 px-4 py-4 rounded-lg bg-blue-200">
                    <div className="card w-80 md:w-[340px] bg-indigo-700 text-white shadow-xl hover:-translate-y-12 transition duration-700">
                        <figure className="px-7 pt-10">
                            <img src="https://workforcesouthplains.org/wp-content/uploads/2017/08/iStock-171585890-3.jpg" alt="Employee" className="rounded-xl w-[400px] h-[180px]" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$15</h2>
                            <p className="text-[18px]">To add 20 employees you have to pay only $15 dollars.</p>
                            <div className="card-actions mt-1">
                                <Link to="/Dashboard/payment?value=3">
                                    <button className="bg-purple-200 px-5 py-1 rounded-lg text-black hover:bg-purple-300 font-semibold">Buy</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Package;