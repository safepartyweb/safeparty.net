'use client'; // for Next.js app router

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay, Pagination  } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const ThumbnailSlider = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (

    <div className="w-full">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // autoplay={false}
        className="mb-4 overflow-hidden main_image border border-gray-500 rounded p-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.url}
              alt={`Product image ${index + 1}`}
              className="w-full h-80 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}

      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
        className="rounded-lg overflow-hidden thumb_slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 object-cover cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}


    </div>
    
    //   <div className="w-full">
    //     <Swiper
    //       spaceBetween={10}
    //       slidesPerView={1}
    //       className="w-full"
    //     >
    //       {images.map((img, index) => (
    //         <SwiperSlide key={index} className="w-full">
    //           <img
    //             src={img.url}
    //             alt={`Product image ${index}`}
    //             className="w-full h-80 object-cover"
    //           />
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>

        
      
    // </div>







  );
}

export default ThumbnailSlider