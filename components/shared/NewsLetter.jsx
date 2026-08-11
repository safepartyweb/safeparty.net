import React from 'react'

const NewsLetter = () => {
  return (
    <section className='sec_newsletter py-6 md:py-10 '>
      <div className='container max-w-sitemax px-8 py-10  mx-auto bg-siteBlack text-white rounded '>
        <div className="newletter_inner flex gap-6 flex-col justify-center ">
          <h2 className='text-4xl font-medium text-center'>Stay in the Know</h2>
          <p className='text-center font-medium text-xl'>Get the latest updates on premium products, industry trends, and exclusive offers — straight to your inbox.</p>

          <form className='flex justify-center flex-col gap-4 w-[500px] max-w-[90%] mx-auto ' action="">
            <input className='border border-white rounded px-4 py-3 text-white' type="email" placeholder='Your email address' />
            <div className="btn_wrapper flex justify-center">
              <button className='bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 font-bold font-lg inline-block cursor-pointer' href="#">Join Now!</button>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  )
}

export default NewsLetter