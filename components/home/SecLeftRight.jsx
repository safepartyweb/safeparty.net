import React from 'react'
import Image from 'next/image'
import Lab from '../../images/lab.svg'
import Quality from '../../images/quality.svg'
import Van from '../../images/van.svg'
import Encrypt from '../../images/encrypt.svg'




const SecLeftRight = () => {
  return (
    <section className='sec_left_right_icons py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <div className="left_right_icon_sec_inner w-full max-w-[1100px]  mx-auto flex gap-8 flex-row flex-wrap">
          
          {/* <div className="single_left_right_icon_wrap flex items-center">
            
            <div className="w-full flex items-center gap-6 flex-col justify-center">
              <Image src={Lab} alt="" width={150} height={150} />
              <h2 className='text-xl font-bold'>LAB TESTED</h2>
            </div>

            <div className="w-full flex items-center gap-6 flex-col justify-center">
              <p className=''><b>Change</b> your reality today. Fentanyl is now a thing of the past, we test <b>EVERY</b> batch we buy. Our goal is to provide a safe supply to prevent fatalities and keep people safe.</p>
            </div>


          </div> */}

          <div className="single_left_right_icon_wrap flex flex-col md:flex-row items-center md:items-start gap-8 w-full md:w-[46%]">
            
            <div className="">
              <Image className='w-24 md:w-auto' src={Lab} alt="Lab Icon" width={250} height={250} />
              
            </div>

            <div className="w-full flex gap-2 flex-col justify-center items-center md:items-start">
              <h2 className='text-2xl font-bold'>LAB TESTED</h2>
              <p className='text-lg font-medium text-center md:text-left'><b>Change</b> your reality today. Fentanyl is now a thing of the past, we test <b>EVERY</b> batch we buy. Our goal is to provide a safe supply to prevent fatalities and keep people safe.</p>
            </div>


          </div>

          <div className="single_left_right_icon_wrap flex flex-col md:flex-row items-center md:items-start gap-8 w-full md:w-[46%]">
            
            <div className="">
              <Image className='w-24 md:w-auto' src={Quality} alt="quality icon" width={250} height={250} />
              
            </div>

            <div className="w-full flex gap-2 flex-col justify-center items-center md:items-start">
              <h2 className='text-2xl font-bold'>UNATTAINABLE QUALITY</h2>
              <p className='text-lg font-medium text-center md:text-left'>If you think you are getting the best, think again. Testing our product at a certified lab doesnt just give us the advantage of filtering bad substances, <b>we buy for purity</b>.</p>
            </div>


          </div>

          <div className="single_left_right_icon_wrap flex flex-col md:flex-row items-center md:items-start gap-8 w-full md:w-[46%]">
            
            <div className="">
              <Image className='w-24 md:w-auto' src={Van} alt="Van icon" width={250} height={250} />
              
            </div>

            <div className="w-full flex gap-2 flex-col justify-center items-center md:items-start">
              <h2 className='text-2xl font-bold'>Free Shipping over 200</h2>
              <p className='text-lg font-medium text-center md:text-left'>Yes, we offer free shipping if you order over 200 dollars of product. WE ONLY SHIP TO CANADIAN ADDRESSES! Canadians can expect their orders in anywhere from <b>two</b> to <b>four</b> business days.</p>
            </div>


          </div>


          <div className="single_left_right_icon_wrap flex flex-col md:flex-row items-center md:items-start gap-8 w-full md:w-[46%]">
            
            <div className="">
              <Image className='w-24 md:w-auto' src={Encrypt} alt="Encrypt icon" width={250} height={250} />
              
            </div>

            <div className="w-full flex gap-2 flex-col justify-center items-center md:items-start">
              <h2 className='text-2xl font-bold'>Encrypted Storage</h2>
              <p className='text-lg font-medium text-center md:text-left'>We understand the importance of <b>your secuirty</b>. This is why we created portals and storage with very restricted access. Rest assured we are extemely privacy oriented. Please read our <b>Privacy Policy</b>.</p>
            </div>


          </div>

 





        </div>
        
      </div>
    </section>
  )
}

export default SecLeftRight