import React from 'react'
import Image from 'next/image'

const SafeHands = () => {
  return (
    <section className='sec_home_quotes py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <div className="safe_hands bg-[#F4EEE2] rounded px-4 py-16">
          <h2 className="text-3xl md:text-5xl text-center font-medium">You're In Safe Hands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-16 gap-5 mt-10">
            
            <div className='flex flex-col gap-4 items-center'>
              <Image src="/images/plant.svg" width={70}  height={250} alt="Plant Image"/>
              <p className="text-2xl font-medium">Locally Sourced</p>
              <p className="text-lg text-center">Enjoy peace of mind knowing all products are made with locally sourced ingredients.</p>
            </div>
            <div className='flex flex-col gap-4 items-center'>
              <Image src="/images/shipping.svg" width={70}  height={250} alt="Plant Image"/>
              <p className="text-2xl font-medium">Easy Shipping</p>
              <p className="text-lg text-center">We’ll bring it to you. All of our products are shipped safely and discreetly right to your doorstep.</p>
            </div>
            <div className='flex flex-col gap-4 items-center'>
              <Image src="/images/dose.svg" width={55}  height={200} alt="Plant Image"/>
              <p className="text-2xl font-medium">Accurate Dosages</p>
              <p className="text-lg text-center">In order to reap the benefits, it’s crucial that each one of our products contains the precise amount of ingredients.</p>
            </div>


           
          </div>
        </div>
      </div>
    </section>
  )
}

export default SafeHands