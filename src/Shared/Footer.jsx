const Footer = () => {
    return (
        <div className="w-full bg-blue-800 text-white mt-12">
            <div className="container mx-auto px-6 lg:px-20">
                <hr className="border-gray-400 opacity-50 mb-8" />
                <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10">
                    {/* Logo and Company Info */}
                    <nav className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <img
                            src="https://pluspng.com/img-png/logo-template-png-logo-templates-1655.png"
                            alt="ServiceSpectrum Logo"
                            className="w-28 h-auto mb-3"
                        />
                        <p className="font-bold text-2xl">ServiceSpectrum</p>
                        <p className="text-sm lg:text-base">24/7 Malibag, Dhaka.</p>
                        <p className="text-xs lg:text-sm mt-2 opacity-75">&copy; 2024 - All rights reserved</p>
                    </nav>

                    {/* Company Links */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="text-lg font-semibold mb-3">Company</h6>
                        <a className="hover:underline text-sm">About us</a>
                        <a className="hover:underline text-sm">Contact</a>
                        <a className="hover:underline text-sm">Jobs</a>
                        <a className="hover:underline text-sm">Press kit</a>
                    </nav>

                    {/* Legal Links */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="text-lg font-semibold mb-3">Legal</h6>
                        <a className="hover:underline text-sm">Terms of use</a>
                        <a className="hover:underline text-sm">Privacy policy</a>
                        <a className="hover:underline text-sm">Cookie policy</a>
                    </nav>

                    {/* Social Links */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="text-lg font-semibold mb-3">Follow Us</h6>
                        <a className="hover:underline text-sm">Twitter</a>
                        <a className="hover:underline text-sm">Instagram</a>
                        <a className="hover:underline text-sm">Facebook</a>
                        <a className="hover:underline text-sm">GitHub</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;