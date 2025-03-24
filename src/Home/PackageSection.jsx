import SectionTitle from "../Shared/SectionTitle";

const PackageSection = () => {
    return (
        <div className="mt-20">
            <SectionTitle heading={'Package'} />
            <div className="flex flex-wrap gap-6 justify-center items-center">
                {/* Package 1 */}
                <div className="w-full sm:w-80 md:w-[340px] px-4 py-6 rounded-lg bg-indigo-300 hover:shadow-2xl transition duration-500 transform hover:scale-105">
                    <div className="card w-full bg-indigo-700 text-white shadow-xl hover:-translate-y-2 transition duration-500 ease-in-out">
                        <figure className="px-7 pt-6">
                            <img src="https://healingspringswellness.com/wp-content/uploads/2020/12/AdobeStock_354245058.jpeg" alt="Employee" className="rounded-xl w-full h-[200px] object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$5</h2>
                            <p className="text-lg">To add 5 employees you have to pay only $5 dollars.</p>
                            <div className="card-actions mt-2">
                                <p className="font-semibold border-b-2 border-white p-2">So, let&apos;s enjoy our site.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Package 2 */}
                <div className="w-full sm:w-80 md:w-[340px] px-4 py-6 rounded-lg bg-indigo-300 hover:shadow-2xl transition duration-500 transform hover:scale-105">
                    <div className="card w-full bg-indigo-700 text-white shadow-xl hover:-translate-y-2 transition duration-500 ease-in-out">
                        <figure className="px-7 pt-6">
                            <img src="https://online.campbellsville.edu/wp-content/uploads/Employe-Eengagement-Ideas-CU.jpg" alt="Employee" className="rounded-xl w-full h-[200px] object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$8</h2>
                            <p className="text-lg">To add 10 employees you have to pay only $8 dollars.</p>
                            <div className="card-actions mt-2">
                                <p className="font-semibold border-b-2 border-white p-2">So, let&apos;s enjoy our site.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Package 3 */}
                <div className="w-full sm:w-80 md:w-[340px] px-4 py-6 rounded-lg bg-indigo-300 hover:shadow-2xl transition duration-500 transform hover:scale-105">
                    <div className="card w-full bg-indigo-700 text-white shadow-xl hover:-translate-y-2 transition duration-500 ease-in-out">
                        <figure className="px-7 pt-6">
                            <img src="https://workforcesouthplains.org/wp-content/uploads/2017/08/iStock-171585890-3.jpg" alt="Employee" className="rounded-xl w-full h-[200px] object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">$15</h2>
                            <p className="text-lg">To add 20 employees you have to pay only $15 dollars.</p>
                            <div className="card-actions mt-2">
                                <p className="font-semibold border-b-2 border-white p-2">So, let&apos;s enjoy our site.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSection;
