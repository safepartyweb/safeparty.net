import React from 'react'
import Link from 'next/link'
import AnimatedBlock from '../shared/MotionParent'

const DashboardLeft = () => {
  return (
    // <div className="dashboard_left w-full sm:max-w-[180px] sm:min-w-[180px] md:max-w-[240px] md:min-w-[240px] bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium flex-1" >
    <div className="dashboard_left  bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1" >
      <AnimatedBlock direction="left">
        <ul className=''>
          <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin">Dashboard</Link></li>
          <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/products">Products</Link></li>
          <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/categories">Categories</Link></li>
          <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/orders">Orders</Link></li>
          <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/affiliates">Affiliates</Link></li>
          <li className='py-1 px-2  text-white font-medium'><Link href="/admin/users/">Users</Link></li>
          <li className='py-1 px-2  text-white font-medium'><Link href="/admin/shipping/">Shipping Methods</Link></li>
        </ul>
      </AnimatedBlock>
    </div>

  )
}

export default DashboardLeft