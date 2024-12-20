const Footer = () => {
    return (
        <div className="mx-auto pt-20">
            <hr />
            <footer className="grid grid-cols-1 lg:grid-cols-4 justify-center lg:pl-20 gap-5 py-20 bg-blue-700 text-white">
                {/* Logo and Company Info */}
                <nav className="flex flex-col items-center lg:items-start">
                    <img 
                        src="https://pluspng.com/img-png/logo-template-png-logo-templates-1655.png" 
                        alt="ServiceSpectrum Logo" 
                        className="w-3/4 max-w-[150px] lg:w-1/2 lg:max-w-[200px] h-auto mb-3"
                    />
                    <p className="font-bold text-2xl">ServiceSpectrum</p>
                    <div className="text-sm lg:text-base">24/7 Malibag, Dhaka.</div>
                    <div className="text-xs lg:text-sm mt-2">Copyright © 2024 - All rights reserved</div>
                </nav>

                {/* Company Links */}
                <nav className="flex flex-col items-center lg:items-start">
                    <h6 className="footer-title text-lg font-semibold mb-2">Company</h6>
                    <a className="link link-hover text-sm lg:text-base">About us</a>
                    <a className="link link-hover text-sm lg:text-base">Contact</a>
                    <a className="link link-hover text-sm lg:text-base">Jobs</a>
                    <a className="link link-hover text-sm lg:text-base">Press kit</a>
                </nav>

                {/* Legal Links */}
                <nav className="flex flex-col items-center lg:items-start">
                    <h6 className="footer-title text-lg font-semibold mb-2">Legal</h6>
                    <a className="link link-hover text-sm lg:text-base">Terms of use</a>
                    <a className="link link-hover text-sm lg:text-base">Privacy policy</a>
                    <a className="link link-hover text-sm lg:text-base">Cookie policy</a>
                </nav>

                {/* Social Links */}
                <nav className="flex flex-col items-center lg:items-start">
                    <h6 className="footer-title text-lg font-semibold mb-2">Social</h6>
                    <a className="link link-hover text-sm lg:text-base">Twitter</a>
                    <a className="link link-hover text-sm lg:text-base">Instagram</a>
                    <a className="link link-hover text-sm lg:text-base">Facebook</a>
                    <a className="link link-hover text-sm lg:text-base">Github</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
