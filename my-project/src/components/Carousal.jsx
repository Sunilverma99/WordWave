import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

function Carousal() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
        style={{ width: '100%', height: '500px' }} // Adjust width and height
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/public/pexels-divinetechygirl-1181406.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
              <div className="absolute top-0 px-12 left-0 w-full h-full flex flex-col justify-end bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold mb-4" data-swiper-parallax="-300">July 2024 Newsletter</h2>
              <h3 className="text-xl mb-2" data-swiper-parallax="-200">The latest report</h3>
              <button type="button" class="text-gray-900 w-52 bg-slate-300 hover:text-white border border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 uppercase">view newsletter</button>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/pexels-goumbik-590041.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
             <div className="absolute top-0 px-12 left-0 w-full h-full flex flex-col justify-end bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold mb-4" data-swiper-parallax="-300">July 2024 Newsletter</h2>
              <h3 className="text-xl mb-2" data-swiper-parallax="-200">The latest report</h3>
              <button type="button" class="text-gray-900 w-52 bg-slate-300 hover:text-white border border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 uppercase">view newsletter</button>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/pexels-rdne-7947846.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
              <div className="absolute top-0 px-12 left-0 w-full h-full flex flex-col justify-end bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold mb-4" data-swiper-parallax="-300">July 2024 Newsletter</h2>
              <h3 className="text-xl mb-2" data-swiper-parallax="-200">The latest report</h3>
              <button type="button" className="text-gray-900 w-52 bg-slate-300 hover:text-white border border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 uppercase">view newsletter</button>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Carousal;
