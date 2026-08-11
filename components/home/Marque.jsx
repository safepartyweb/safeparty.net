'use client';

import React from 'react'
import Image from 'next/image'
import Bitcoin from '../../images/coins/bitcoin.png'
import Eth from '../../images/coins/ethlogo.png'
import Transfer from '../../images/coins/transfer.png'
import Litecoin from '../../images/coins/litecoin.png'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

import { Autoplay, FreeMode } from 'swiper/modules';

const Marque = () => {
  return (
    <section className='sec_marque py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto bg-siteBlack rounded py-4'>

      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={4000}
        allowTouchMove={false}
        grabCursor={true}
        className="w-full"
      >

          <SwiperSlide>
            <Image src={Bitcoin} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Eth} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Transfer} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Litecoin} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>

          <SwiperSlide>
            <Image src={Bitcoin} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Eth} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Transfer} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Litecoin} alt="Coin Image" width={150} height={40} />
          </SwiperSlide>

        


        </Swiper>        
        
        
        
        
      </div>
    </section>
  )
}

export default Marque