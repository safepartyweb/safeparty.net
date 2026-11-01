'use client'

import { useState } from 'react';
import FaqItem from '@/components/faq/FaqItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ChevronUp, ChevronDown } from 'lucide-react';


const faqData = [
  {
    question: 'Who is eligible to order?',
    answer:
      'Any Canadian resident that is 19 years of age or older.',
  },
  {
    question: 'Can I edit or cancel my order?',
    answer:
      'Please reach out to us to make any changes to your order. As long as your item hasn’t shipped we will be help make the changes you need.',
  },
  {
    question: 'Is it safe to buy these products online?',
    answer:
      'Its very safe! The packages are covered by the CanadaPost Corporation Act which states that law enforcement may not seize or interfere with the delivery of your mail, [unreadable text] threat to national security',
  },
  {
    question: 'Can I edit or cancel my order?',
    answer:
      'Please reach out to us to make any changes to your order. As long as your item hasn’t shipped we will be help make the changes you need. Buying online is typically safer than buying from a dealer.',
  },

  {
    question: 'What payment options are available?',
    answer:
      'We currently accept payment by Bitcoin and e-Transfer. If your not familiar with paying by bitcoin then please visit Guide to paying by BTC to learn how. Its actually quite easy. Only e-Transfers from Canadian bank accounts will accepted. Follow the emailed instructions.',
  },
  {
    question: 'I submitted my order and made payment. Now what?',
    answer:
      'It can take some time for the funds to arrive in our account. Once payment is confirmed you will receive a confirmation email letting you know your order is processing. Our typical order processing time is one business day. Once your order has been shipped, you will receive an e-mail with your shipment\'s tracking information, allowing you to keep tabs on the progress of your delivery.   If you have any concerns please don\'t hesitate to contact us.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'In the cases where a refund is required. Interac e-Transfer payments will be refunded to the same email / bank account less bank fees. Cryptocurrency payments would be refunded as a store credit coupon code. Any crypto payment to an incorrect crypto address will not be refunded. Always copy and paste the crypto address you are sending payment to.',
  },
  {
    question: 'How will my order be packaged?',
    answer:
      'All orders are sent in very plain and discreet packaging with no indication of contents.',
  },
  {
    question: 'What shipping options are available?',
    answer:
      'All orders are sent via Canada Post Xpresspost. This is the safest and quickest option.   ',
  },
  {
    question: 'How much does shipping cost?',
    answer:
      'Canada wide express shipping is $25 on orders under $1200. Orders $200 or over ship free.',
  },
  {
    question: 'Do I need to sign for my package?',
    answer:
      'No. Your order will arrive in your mailbox just like any other mail from Canada Post.',
  },
  {
    question: 'Can you ship outside of Canada?',
    answer:
      'We do not ship outside of Canada only shipping Canada wide.',
  },

];

const page = () => {
  return (
    <section className='sec_hero_bar py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <h1 className="text-2xl font-bold">FAQ page</h1>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>




      </div>
    </section>
  )
}

export default page