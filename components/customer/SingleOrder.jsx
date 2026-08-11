'use client'
import React,{useState, useEffect, useRef} from 'react'
import AnimatedBlock from '../shared/MotionParent'
import VerDot from '@/images/verticaldots.svg'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'


const SingleOrder = ({order,sl}) => {

  // console.log("Order from single customer Order Item:", order)
  const divRef = useRef(null);
  const orderDate = dayjs(order.createdAt).format('MMM DD, YYYY');
  // console.log("Order Date", orderDate)
  
  const [showOptions, setShowOptions] = useState(false)

  const showOptionsHandler = () => {
    console.log("clicked!")
    setShowOptions(!showOptions)
  }

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowOptions(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AnimatedBlock direction="up">
      <div className='flex gap-2 justify-between items-center border-b border-gray-500 pb-4'>
        <div className="prod_sl flex-1">{sl + 1}.</div>
        <div className="flex-1">{orderDate}</div>
        <div className="title flex-1">${order.totalPrice}</div>
        <div className="title flex-1">{order.status}</div>
        <div className="title flex-1">{order.isPaid ? "Paid" : "Not Paid"}</div>

        <div ref={divRef} className="title flex-1 flex justify-end relative">
          <Image onClick={showOptionsHandler} className='cursor-pointer verticaldots' src={VerDot} width={12} height={42} alt="Vertical Dot" />
          {showOptions && <div  className="options absolute top-[110%] right-0 bg-gray-700 p-6 min-w-[200px] text-white rounded z-10">
            <ul>
              <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
                <Link href={`/dashboard/orders/${order._id}`}>View Details</Link>
              </li>
            </ul>
          </div>}
          
        </div>

      </div>
    </AnimatedBlock>
  )





}

export default SingleOrder