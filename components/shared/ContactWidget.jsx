'use client'
import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react' // Or use any SVG/icons you prefer

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Replace these with your actual phone numbers (include country code without '+' for WhatsApp, or with '+' for Signal if needed)
  const whatsappNumber = "+14743570327" 
  const signalNumber = "+14743570327"

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-2 transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="text-xs font-semibold text-gray-400 px-2 pt-1">
            Start a conversation
          </div>

          {/* WhatsApp Chat */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition font-medium text-sm"
          >
            <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
              WA
            </span>
            WhatsApp Chat
          </a>

          {/* Signal Chat */}
          <a
            href={`https://signal.me/#p/${signalNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition font-medium text-sm"
          >
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              SG
            </span>
            Signal Chat
          </a>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform focus:outline-none"
        aria-label="Open contact chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  )
}

export default ContactWidget