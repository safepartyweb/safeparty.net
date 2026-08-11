import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Bitcoin from '../../images/coins/bitcoin.png'
import Eth from '../../images/coins/ethlogo.png'
import Litecoin from '../../images/coins/litecoin.png'
import Transfer from '../../images/coins/transfer.png'
import AnimatedBlock from './MotionParent'


const Footer = () => {
  return (
    <AnimatedBlock className='' direction="up">
      <section className='sec_footer py-6 md:py-10 md:pb-0'>
            <div className='container max-w-sitemax px-8 mx-auto border-t bg-siteBlack text-white border-siteBlack py-10 rounded'>


            <footer className="bg-[#0C1233] text-white px-6 md:px-16 py-12">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left Section */}
                <div>
                  <Image src='/images/logo-4-8-final.png' alt="logo" width={100} height={150} />
                  <p className="mb-6 max-w-sm">
                    Psychedelics with Benefits. The next dimension in mind-body growth. Join our newsletter.
                  </p>

                  <form className="flex w-full flex">
                    <input
                      type="email"
                      placeholder="Your e-mail address"
                      className="border border-white rounded rounded-tr-[0] rounded-br-[0] px-4 py-3 text-white w-full"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-white to-gray-200 text-black px-4 py-2 rounded-r-md border border-white cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M3 10l11 2-11 2v2l16-4L3 6v2z"/>
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Middle Section */}
                <div>
                  <h3 className="font-semibold mb-4">COMPANY</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
                    <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                    <li><Link href="mailto:support@safeparty.com" className="hover:underline">Email support@safeparty.com</Link></li>
                  </ul>
                </div>

                {/* Right Section */}
                <div>
                  <h3 className="font-semibold mb-4">RESOURCES</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/shop" className="hover:underline">Shop</Link></li>
                    <li><Link href="/affiliate/login" className="hover:underline">Affiliate</Link></li>
                    <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
                    <li><Link href="/harm-reduction" className="hover:underline">Harm Reduction</Link></li>
                    <li><Link href="/self-exclusion" className="hover:underline">Self-Exclusion</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 border-t border-white border-opacity-20 pt-6 text-center text-sm text-gray-400">
                © 2025 All Rights Reserved Safe Party.
              </div>
            </footer>


              
              {/* <div className="footer_wrap flex flex-col lg:flex-row gap-16 lg:gap-10 justify-center">
                
                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Accepted Payments</p>
                  <div className="payment_icons_wrap flex gap-6 flex-col ">
                    <Image className='max-w-[120px] h-auto' src={Bitcoin} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px] h-auto' src={Eth} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px] h-auto' src={Litecoin} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px] h-auto' src={Transfer} alt="payment logo" width={320} height={100} />
                  </div>
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">How to pay</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>

                <div className="footer_column w-full">
                  <Image src='/images/logo-new.jpg' alt="logo" width={150} height={200} />
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Useful links</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Members area</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>


              </div> */}
              
            </div>
      </section>
    </AnimatedBlock>
    
  )
}

export default Footer