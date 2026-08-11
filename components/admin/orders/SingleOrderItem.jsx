import React,{useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import VerDot from '@/images/verticaldots.svg'
import Link from 'next/link'
import AnimatedBlock from '@/components/shared/MotionParent'
import dayjs from 'dayjs'
import { useDeleteOrderMutation } from '@/lib/api/orderApi'
import { toast } from 'react-toastify'


const SingleOrderItem = ({order,sl}) => {
  
  console.log("Order from single Order Item:", order)
  const divRef = useRef(null);
  
  const [showOptions, setShowOptions] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

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


  const [deleteOrder,{isLoading}] = useDeleteOrderMutation()

  const deleteOrderHandler = async (orderId) => {
    // console.log("Delete Handler!")
    setShowLoader(true)

    try {
      const apiRes = await deleteOrder({orderId});
      console.log("Delete apiRes:", apiRes);
      toast.success("Successfully deleted!")
    } catch (error) {
      console.log("Error", error)
      toast.error("Something went wrong!")
    } finally{
      setShowLoader(false)
      setShowDelete(false)
    }

    
  }

  return (
    <AnimatedBlock direction="up">
    <div className='flex gap-2 justify-between items-center border-b border-gray-500 pb-4'>
      <div className="prod_sl flex-1">{sl}.</div>
      <div className="prod_sl flex-[1.5]">{dayjs(order.createdAt).format('DD MMM, YYYY')}.</div>
      <div className="prod_img flex-[2.5]"> {order.user.fullName}   </div>
      {/* <div className="title flex-6">{order.title}</div> */}
      <div className="title flex-3">${order.totalPrice}</div>
      <div className="title flex-3">{order.status}</div>
      <div className="title flex-3">{order.isPaid ? "Paid" : "Not paid"}</div>
      {/* <div className="title flex-3">{order.bestSeller ? "Yes" : "No"}</div> */}
      <div ref={divRef} className="title flex-1 flex justify-center relative">
        <Image onClick={showOptionsHandler} className='cursor-pointer verticaldots' src={VerDot} width={12} height={42} alt="Vertical Dot" />
        {showOptions && <div  className="options absolute top-[110%] right-0 bg-gray-700 p-6 min-w-[200px] text-white rounded z-10">
          <ul>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link href={`/admin/orders/${order._id}`}>View Details</Link>
            </li>
            {/* <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link href={`/admin/orders/edit/${prod._id}`}>Edit</Link>
            </li> */}
            <li onClick={e => setShowDelete(true)} className='py-2 border-b border-gray-300 w-full cursor-pointer'>Delete</li>
            {/* <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>Delete</li> */}
          </ul>
        </div>}
        
      </div>

      {showDelete && (

        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
          <div className="overlay_inner w-full max-w-[360px] min-h-[200px] bg-siteGray text-white flex justify-center p-6 flex-col">
              <h1 className='text-2xl font-bold mb-4 text-center text-black'>Delete Order?</h1>
              <p className="text-lg mb-6 text-center text-black ">You can't undo this delete.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={e => setShowDelete(false)} className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer">Cancel</button>
                <button onClick={e => deleteOrderHandler(order._id)} className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer">Delete</button>
              </div>
          </div>
        </div>
      )}

    </div>
    </AnimatedBlock>
  )
}

export default SingleOrderItem