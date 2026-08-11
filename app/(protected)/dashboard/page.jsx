'use client'


import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '@/lib/api/customerApi'
import Loader from '@/components/Loader'
import SingleOrder from '@/components/customer/SingleOrder'


const UserDahsboard =  () => {

  const user = useSelector(state => state.auth.userInfo);

  const [orders, setOrders ]= useState([])

  // console.log("User", user)

  const {data, isLoading} = useGetOrdersQuery();

  useEffect(()=>{

    if(data){
      setOrders(data.orders)
    }
  },[data])

  if(isLoading){
    return <Loader />
  }
  
  // console.log("Orders data",data)
  // console.log("First 5", orders.slice(0,5))
  //const firstFiveOrders = [...orders].reverse().slice(0,5);

  return (
    <>
      <h1 className='text-xl font-medium'>Hello {user?.fullName}, welcome back!</h1>

      <div className="recent_orders my-4 overflow-x-auto ">
        <h2 className='text-lg font-medium'>Recent Orders:</h2>
        
        <div className='min-w-[500px] '>
          <div className="orders_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
            <div className="prod_sl flex-1">SL.</div>
            <div className="prod_sl flex-1">Date</div>
            <div className="title flex-1">Amount</div>
            <div className="title flex-1">Status</div>
            <div className="title flex-1">Payment</div>
            <div className="title flex-1 flex justify-end">Actions</div>
          </div>
          
          <div className="prod_wrap flex flex-col gap-4">
            {orders.map((item,index) => <SingleOrder key={index} order={item} sl={index} /> )}
          </div>
        </div>





      </div>
    </>
  )
}

export default UserDahsboard