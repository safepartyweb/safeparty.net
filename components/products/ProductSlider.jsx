'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Link from 'next/link';
import Button from '../Button';
import BlackButton from '../BlackButton';
import ProductImage from '../../images/products/bubblegum.gif'

import SlideSingleProduct from './SlideSingleProduct';



const ProductSlider = ({products}) => {



  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay,EffectFade]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      // effect="fade"
      // fadeEffect={{ crossFade: true }}
      speed={500}
      // autoplay={{ delay: 3000 }}
      autoplay={true}
      loop

      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}

      className="overflow-hidden h-full rounded product_slider !pb-[50px]"
    >
      {products.map(product =><SwiperSlide>
        
        <SlideSingleProduct product={product} />
        
      </SwiperSlide> )}





  </Swiper>
  )
}

export default ProductSlider