'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetSingleOrderQuery } from '@/lib/api/orderApi'
import Loader from '@/components/Loader'
import Image from 'next/image'
import dayjs from 'dayjs'
import BlackButton from '@/components/BlackButton'



const page = () => {
  const {orderId} = useParams()
  console.log("Order Id", orderId)
  const {data,isLoading} = useGetSingleOrderQuery({orderId})

  if(isLoading){
    return <Loader />
  }
  console.log("Oder Data:", data)
  const order = data.order;
  const user = data.order.user


  return (
    <>
      <BlackButton link="/dashboard/orders">Back to orders</BlackButton>
      <h1 className="text-xl font-bold mt-6">Order Details</h1>
      
      <div className="border-b pb-4 mb-6">
        <h1 className="text-lg font-medium">Order #{order._id}</h1>
        <p className="text-sm text-gray-600"><span className='font-bold'>Placed on:</span> {dayjs(order.createdAt).format('DD MMM, YYYY')} </p>

        <span className='font-bold'>Status: </span>
        <span className={`px-2 py-1 text-sm rounded 
          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>
        <p>{user.fullName}</p>
        <p>{user.address}, {user.city}, {user.country}</p>
        <p>Phone: {user.phone}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Items in this Order</h2>
        {order.orderItems.map(item => (
          <div key={item.productId} className="flex gap-4 border-b py-3">
            <Image src={item.image} alt={item.name} width={60} height={60} />
            <div className="flex-grow">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm">Qty: {item.quantity} × ${item.price}</p>
            </div>
            <p className="font-semibold">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded shadow-sm max-w-md">
        <h2 className="font-semibold text-lg mb-3">Payment Summary</h2>
        <div className="flex justify-between mb-1"><span>Subtotal:</span><span>${order.itemsPrice}</span></div>
        <div className="flex justify-between mb-1"><span>Shipping Fee:</span><span>${order.shippingPrice}</span></div>
        {order.discount && (
          <div className="flex justify-between mb-1"><span>Discount:</span><span>-${order.discount}</span></div>
        )}
        <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span><span>${order.totalPrice}</span></div>
      </div>


      {/* <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Order Activity</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>🛒 Ordered: </li>
          <li>🚚 Shipped: </li>
          <li>📦 Delivered: </li>
        </ul>
      </div> */}







    </>
  )
}

export default page