'use client'
import React from 'react'
import SingleOrder from '../customer/SingleOrder'

const CustomerOrders = ({orders, page, limit}) => {


  console.log("Orders", orders)
  console.log("page", page)
  return (
    <>
      <div className="prod_wrap flex flex-col gap-4">
        {orders.map((order,index) => <SingleOrder key={order._id} order={order} sl={page > 1 ?(page - 1)*limit+ (index+1) : index+1} />)}
      </div>
      
    </>
  )
}

export default CustomerOrders