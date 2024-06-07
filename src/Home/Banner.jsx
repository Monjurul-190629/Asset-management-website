import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='pt-16'>
            <Carousel>
                <div className='image-container'>
                    <img src="https://i.ibb.co/stv0Xb9/business-4.jpg" />
                    <div className='button-container'>
                        <Link to="/join_as_employee">
                            <button className='btn bg-purple-800 text-white hover:text-blue-800  btn-md md:btn-lg font-bold md:text-xl'>Join as Employee</button>
                        </Link>
                    </div>

                </div>
                <div className='image-container'>
                    <img src="https://wallpaperaccess.com/full/656670.jpg" className='' />
                    <div className='button-container'>
                        <Link to="/join_as_manager">
                            <button className='btn bg-purple-800 text-white hover:text-blue-800 btn-md md:btn-lg font-bold md:text-xl'>Join as Manager</button>
                        </Link>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;