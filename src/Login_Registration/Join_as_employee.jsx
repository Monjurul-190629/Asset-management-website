

const Join_as_employee = () => {
    return (
        <div className="pt-20 md:mx-32 mx-0">
            <div className="md:bg-purple-400 rounded-lg">
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:p-20 max-w-screen-xl">
                    <div className="px-16 md:px-20 py-10 mr-5 bg-gray-300 rounded-xl w-[470px] border-x-slate-400">
                        <h2 className="text-xl font-semibold mb-5">Register as a New Employee</h2>
                        <form>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Full Name : </p>
                                <input type="text" id="fullName" className="w-full mb-5 p-1 " name="fullName" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Email : </p>
                                <input type="email" id="email" className="w-full mb-5 p-1" name="email" required />
                            </div>
                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Password : </p>
                                <input type="password" id="password" className="w-full mb-5 p-1" name="password" required />
                            </div>

                            <div className="form-group">
                                <p className="font-bold text-xl mb-2">Date_of_Birth : </p>
                                <input type="date" id="date" className="w-full mb-5 p-1" name="date" required />
                            </div>

                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                    <div className="info-container">
                        <img
                            src="https://i.ibb.co/pwT3gDb/sign-up-edit-mail-icon-glossy-blue-round-button-isolated-abstract-illustration-90055351.jpg" className="w-[300px] md:w-[500px] md:h-[400px] rounded-lg"
                            alt="Sign up image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join_as_employee;