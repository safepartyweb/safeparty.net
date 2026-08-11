'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';




const HomeQoutes = () => {
  return (
    <section className='sec_home_quotes py-6 md:py-10 bg-[#F7F8F8]'>
      <div className='container max-w-sitemax px-4 mx-auto '>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay,EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // effect="fade"
          // fadeEffect={{ crossFade: true }}
          speed={500}
          // autoplay={{ delay: 3000 }}
          autoplay={false}
          loop


          className="overflow-hidden h-full rounded product_slider !pb-[50px]">
            
            <SwiperSlide>
              <div className="single_quote flex flex-col items-center">
                <Image className='max-w-[150px]' src="/images/quotes/time.png" alt="" width={480} height={220} />
                <p className="text-xl mt-5 md:mt-10 w-full max-w-[680px] text-center px-[50px] md:px-[0]">“you’re not going on a full-fledged trip down the rabbit hole; you’re just trying to harness your inner creativity more clearly.”</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single_quote flex flex-col items-center">
                <Image className='max-w-[150px]' src="/images/quotes/forbes.png" alt="" width={480} height={220} />
                <p className="text-xl mt-5 md:mt-10 w-full max-w-[680px] text-center px-[50px] md:px-[0]">"promising potential in treating patients with mental health conditions."</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single_quote flex flex-col items-center">
                <Image className='max-w-[150px]' src="/images/quotes/rollingstone.png" alt="" width={480} height={220} />
                <p className="text-xl mt-5 md:mt-10 w-full max-w-[680px] text-center px-[50px] md:px-[0]">“alleviated a bevy of disorders, including depression, migraines and chronic-fatigue syndrome, while increasing outside-the-box thinking...”</p>
              </div>
            </SwiperSlide>
            
            
            




        </Swiper>
      </div>
    </section>
  )
}

export default HomeQoutes