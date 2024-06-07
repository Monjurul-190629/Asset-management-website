import SectionTitle from "../Shared/SectionTitle";


const About = () => {

    return (
        <div>
            <SectionTitle heading={'About_our_site'}></SectionTitle>
            <div className="md:px-20 px-4 py-10 bg-purple-700 rounded-xl text-white text-justify">

                <div className="flex flex-col lg:flex-row-reverse gap-5 md:gap-10 md:justify-center">
                    <div className='md:flex-1'>
                        <img src="https://qaieschool.com/wp-content/uploads/2020/11/SOFTWARE-ENGINEER.jpg" className="max-w-full rounded-lg shadow-2xl" />
                    </div>
                    <div className='md:flex-1'>

                        <p className="py-6">
                            <span className='text-3xl font-bold text-blue-400'>At ServiceSpectrum,</span>  we are dedicated to providing top-notch service solutions tailored to meet your unique needs. Our platform connects you with a wide range of professional services, ensuring you receive the highest 
                            quality assistance, whether you're seeking technical support, business consultancy, or specialized services.
                            Our commitment to excellence and customer satisfaction sets us apart. We carefully vet all our service providers 
                            to ensure they meet our stringent quality standards, giving you peace of mind with every interaction.
                            Explore our comprehensive service offerings and discover how ServiceSpectrum can help streamline your tasks, 
                            enhance your productivity, and achieve your goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;