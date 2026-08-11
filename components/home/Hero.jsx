'use client';

import React,{useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Button from '../Button';
import BlackButton from '../BlackButton';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductImage from '../../images/products/bubblegum.gif'
import ProductImage2 from '../../images/products/Raspberry.gif'

import AnimatedBlock from '../shared/MotionParent';
import SlideSingleProduct from '../products/SlideSingleProduct';
import HeroSlideSingleProduct from '../products/HeroSlideSingleProduct';





const Hero = () => {


  const [videoLoaded, setVideoLoaded] = useState(false);

  // console.log("showHeroProducts", showHeroProducts)

  return (
    <section className='sec-home-hero'> 
      <div className='container max-w-sitemax px-4 mx-auto'>
            
          {/* <div className="home-hero-wrap flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-center h-auto lg:h-[400px]">
            <div className="home-hero-left w-full lg:w-[50%] h-full flex items-center flex-col justify-center gap-6 lg:order-first order-last pr-0 lg:pr-10">
              <h1 className='text-3xl  md:text-5xl font-bold text-siteBlack'>Trusted Supplier of Pharmaceutical-Grade Cocaine</h1>
              <p className="text-siteBlack font-medium text-xl md:text-2xl ">Serving licensed professionals across Canada with high-purity, regulated products for clinical and scientific use.</p>
              
              <div className="hero_btn_wrap w-full ">
                <BlackButton link="/" >Shop Now!</BlackButton>
              </div>


            </div>

            
            <div className="home-hero-right w-full  lg:w-[50%] h-full order-first lg:order-last" >
              <Swiper
                // modules={[Navigation, Pagination, Autoplay]}
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                // navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000 }}
                // autoplay={false}
                loop
                className="overflow-hidden h-full rounded"
              >
                {showHeroProducts.map(product => <SwiperSlide>

                  
                  <HeroSlideSingleProduct product={product}/>
                  
                </SwiperSlide> )}
                
                

              </Swiper>
            </div>

          </div> */}
        
        <AnimatedBlock direction='up'>

          <div className="relative w-full h-screen overflow-hidden rounded">
            
            
            <img
              src="/videos/vid_placeholder.png"
              alt="Hero placeholder"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            
            {/* Background video or image */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/videos/video.mp4" // replace with your actual video path
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 bg-opacity-30 z-10"></div>

            {/* Text Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
              <h1 className="text-4xl md:text-6xl leading-[1.2] mb-4 text-center">
              Ease your mind with <br/><span className="font-bold">Safe Party</span>
              </h1>
              {/* <p className="text-xl md:text-2xl mb-6">Psychedelic Medicine</p> */}

                <Link className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all rounded-md text-lg" href="/shop">Shop Now</Link>

            </div>
          </div>
        </AnimatedBlock>
        



          
          
          
        
      </div>
    </section>
  )
}

export default Hero