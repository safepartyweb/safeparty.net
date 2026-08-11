'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ProductImage from '../../images/products/bubblegum.gif'
import Doctor from '../../images/doctor-3.jpg'
import Technician from '../../images/doctor.jpg'
import Money from '../../images/money.png'
import Button from '../Button';



const HomeSlider = () => {
  return (
    <section className='sec_hero_bar py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto h-auto lg:h-[500px]'>
      <Swiper
              modules={[Pagination, Autoplay,EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              // navigation
              pagination={{ clickable: true }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={1200}
              autoplay={{ delay: 3000 }}
              // autoplay={false}
              loop
              className="overflow-hidden h-full rounded"
            >
              <SwiperSlide>
                <div className="single_slide flex flex-col sm:flex-row gap-8 items-center justify-center h-full bg-siteBlack text-white px-4 py-8 lg:px-10 lg:py-10">
                  <div className="slide_left w-full md:w-auto order-last md:order-last ">
                      <h2 className="text-3xl md:text-6xl font-medium uppercase mb-8">Transparent Result</h2>
                      <p className='text-2xl md:text-4xl font-medium mb-2'>Lab tested.</p>
                      <p className='text-2xl md:text-4xl font-medium mb-6'>Unsarpassed purity!</p>
                      <p className="uppercase text-lg md:text-xl"> <Link className='text-amber-300' href="/" >Click here</Link> to see our latest lab results</p>
                      <div className="btn_wrap mt-6">
                        <Button>Shop Now</Button>
                      </div>
                  </div>
                  <div className="slide_right   flex">
                    <Image className='rounded' src={Technician} alt="Product Image" width={200} height={200} />
                  </div>
                </div>
                
              </SwiperSlide>


              <SwiperSlide>
                <div className="single_slide flex flex-col sm:flex-row gap-8 items-center justify-center h-full bg-siteBlack text-white px-4 py-8 lg:px-10 lg:py-10">
                  <div className="slide_left w-full md:w-auto  order-last md:order-last">
                      <h2 className="text-3xl md:text-6xl font-medium uppercase mb-8">Referal Bonus</h2>
                      <p className='text-2xl md:text-4xl font-medium mb-2'>Quality assured.</p>
                      <p className='text-2xl md:text-4xl font-medium mb-6'>Unsarpassed purity!</p>
                      <p className="uppercase text-lg md:text-xl"> <Link className='text-amber-300' href="/" >Click here</Link> to know more!</p>
                      <div className="btn_wrap mt-6">
                        <Button>Shop Now</Button>
                      </div>
                  </div>
                  <div className="slide_right   flex ">
                    <Image className='rounded' src={Money} alt="Product Image" width={200} height={400} />
                  </div>
                </div>
                
              </SwiperSlide>

              <SwiperSlide>
                <div className="single_slide flex flex-col sm:flex-row gap-8 items-center justify-center h-full bg-siteBlack text-white px-4 py-8 lg:px-10 lg:py-10">
                  <div className="slide_left w-full md:w-auto order-last md:order-last ">
                      <h2 className="text-3xl md:text-6xl font-medium uppercase mb-8">UNATTAINABLE QUALITY</h2>
                      <p className='text-2xl md:text-4xl font-medium mb-2'>Quality assured.</p>
                      <p className='text-2xl md:text-4xl font-medium mb-6'>Unsarpassed purity!</p>
                      {/* <p className="uppercase text-lg md:text-xl"> <Link className='text-amber-300' href="/" >Click here</Link> to see our latest lab results</p> */}
                      <div className="btn_wrap mt-6">
                        <Button>Shop Now</Button>
                      </div>
                  </div>
                  <div className="slide_right  flex ">
                    <Image className='rounded' src={Doctor} alt="Product Image" width={200} height={200} />
                  </div>
                </div>
                
              </SwiperSlide>
              
              {/* <SwiperSlide>
                <div className="single_slide flex flex-col gap-4 items-center justify-center h-full bg-siteBlack text-white py-8 lg:py-0">
                  <Image className='rounded' src={ProductImage2} alt="Product Image" width={200} height={200} />
                  <div className="product_meta flex gap-0 flex-col justify-center">
                    <p className="slide_title text-center text-uppercase font-bold">COCAINE – RASPBERRY WASH</p>
                    <p className="slide_description text-center font-bold">$110 - $1600</p>

                    
                  </div>
                </div>
                
              </SwiperSlide>

              <SwiperSlide>
                <div className="single_slide flex flex-col gap-4 items-center justify-center h-full bg-siteBlack text-white py-8 lg:py-0">
                  <Image className='rounded' src={ProductImage} alt="Product Image" width={200} height={200} />
                  <div className="product_meta flex gap-0 flex-col justify-center">
                    <p className="slide_title text-center text-uppercase font-bold">COCAINE SPRAY – BUBBLEGUM</p>
                    <p className="slide_description text-center font-bold">$90 - $100</p>

                    
                  </div>
                </div>
                
              </SwiperSlide> */}

            </Swiper>
        
      </div>
    </section>
  )
}

export default HomeSlider