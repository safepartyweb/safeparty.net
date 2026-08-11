// components/FaqItem.jsx
'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium text-lg"
      >
        <span>{question}</span>
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 text-base">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
