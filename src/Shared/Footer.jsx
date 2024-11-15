

const Footer = () => {
    return (
        <div className=" mx-auto pt-20">
            <hr />
            
            <footer className="grid grid-cols-1 lg:grid-cols-4 justify-center text-center gap-10  py-20 bg-blue-700 text-white" >
                <nav className="flex flex-col">
                    <img src="https://pluspng.com/img-png/logo-template-png-logo-templates-1655.png" className="w-1/4 ml-36 md:ml-28 mb-1" />
                    <p className="font-bold text-2xl">ServiceSpectrum</p>
                    <div>
                        24/7 malibag, Dhaka.
                    </div>
                    <div>
                        Copyright © 2024 - All right reserved
                    </div>
                </nav>
                <nav className="flex flex-col">
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className="flex flex-col">
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav className="flex flex-col">
                    <h6 className="footer-title">Social</h6>
                    <a className="link link-hover">Twitter</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">Github</a>
                </nav>
                

            </footer>
        </div>
    );
};

export default Footer;