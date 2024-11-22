import { useEffect, useRef, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import './App.css'
import { NavLink } from 'react-router-dom';

const Banner = () => {
    const [swiper, setSwiper] = useState(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiper !== null) {
            const interval = setInterval(() => {
                if (swiper.isEnd) {
                    swiper.slideTo(0); // If it's the last slide, go back to the first one
                } else {
                    swiper.slideNext(); // Go to the next slide
                }
            }, 3000);

            // Clear the interval when the component unmounts
            return () => clearInterval(interval);
        }
    }, [swiper]);
    return (
        <div>
            <Swiper
                ref={swiperRef}
                onSwiper={setSwiper}
                loop={true}
                autoplay={{
                    delay: 20000,
                    disableOnInteraction: false // To ensure autoplay continues after user interaction
                }}
            >


                <SwiperSlide className='banner-slide'><img src="https://www.arteil.com.au/wp-content/uploads/2022/07/office-chairs-brisbane.jpg" className='w-screen h-[600px] banner-image ' />
                    <div className=''>
                        <div className="banner-content">
                            <h1 className='text-white font-semibold text-xl  md:text-3xl mb-2 md:mb-4 text-left'><span className='md:text-3xl'>Explore our site, Where </span>exceptional experiences awaits</h1>
                            <p className='text-white font-semibold  md:text-[18px] text-justify'>Elevate your company`s experience with our exceptional services designed to streamline and enhance your operations. <br /> <span className='underline mt-3'>Join as HR</span>
                            <NavLink to="/join_as_manager" className="font-semibold"> <button className="bg-slate-100 text-blue-700 hover:bg-slate-300 py-2 px-5 hover:text-blue-800 md:ml-5 rounded-lg mt-3">Join now</button> </NavLink>  </p>
                        </div>
                        <div className="banner-overlay">
                            
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='banner-slide'><img src="https://i.pinimg.com/originals/ab/f9/86/abf98643d2b2ec0f43a1ca926312ed13.jpg" className='w-screen h-[600px] banner-image ' />
                    <div className="banner-content ">
                        <h1 className='text-white font-semibold text-xl md:text-3xl mb-2 md:mb-4 text-left'><span className='md:text-3xl'>Explore our site, Where </span>exceptional experiences awaits </h1>
                        <p className='text-white font-semibold  md:text-[18px] text-justify'>Elevate your company`s experience with our exceptional services designed to streamline and enhance your operations. <br /> <span className='underline mt-3'>Join as HR</span>
                        <NavLink to="/join_as_manager" className="font-semibold"> <button className="bg-slate-100 text-blue-700 hover:bg-slate-300 py-2 px-5 hover:text-blue-800 md:ml-5 rounded-lg mt-3">Join now</button> </NavLink>  </p>
                    </div>
                    <div className="banner-overlay"></div>
                </SwiperSlide>

                <SwiperSlide className='banner-slide'><img src="https://wonderfulengineering.com/wp-content/uploads/2014/01/beautiful-wallpaper-39.jpg" className='w-screen h-[600px] banner-image ' />
                    <div className="banner-content ">
                        <h1 className='text-white font-semibold text-xl md:text-3xl mb-2 md:mb-4 text-left'><span className='md:text-3xl'>Explore our site, Where </span>exceptional experiences awaits </h1>
                        <p className='text-white font-semibold  md:text-[18px] text-justify'>Elevate your company`s experience with our exceptional services designed to streamline and enhance your operations. <br /> <span className='underline mt-3'>Join as HR</span>
                        <NavLink to="/join_as_manager" className="font-semibold"> <button className="bg-slate-100 text-blue-700 hover:bg-slate-300 py-2 px-5 hover:text-blue-800 md:ml-5 rounded-lg mt-3">Join now</button> </NavLink>  </p>
                    </div>
                    <div className="banner-overlay"></div>
                </SwiperSlide>




            </Swiper>
        </div>
    );
};

export default Banner;