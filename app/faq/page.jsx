'use client'

import { useState } from 'react';
import FaqItem from '@/components/faq/FaqItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ChevronUp, ChevronDown } from 'lucide-react';


const faqData = [
  {
    question: 'How long does shipping take?',
    answer:
      'We typically process and ship all orders within 1-2 business days. For domestic orders, delivery usually takes 2-4 days. International orders may take 7-14 days.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes! You can return any unused product within 14 days of delivery for a full refund. Please refer to our return policy for more details.',
  },
  // Add more items here
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