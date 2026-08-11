import React from 'react'
import Link from 'next/link'
import AnimatedBlock from '../shared/MotionParent'
// import NavLink from '../shared/NavLink'

const DashboardLeft = () => {
  return (
    // <div className="dashboard_left w-full sm:max-w-[180px] sm:min-w-[180px] md:max-w-[240px] md:min-w-[240px] bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium flex-1" >
    <div className="dashboard_left  bg-siteGray p-2 rounded  md:min-h-[400px] text-xl font-medium col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1" >
      <AnimatedBlock direction="left">
        <ul className='flex flex-col gap-1'>
          {/* <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/dashboard">Dashboard</Link></li> */}
          <Link className='text-white' href="/affiliate/dashboard" label="Dashboard" >Dashboard </Link>
          <Link className='text-white' href="/affiliate/dashboard/withdrawals" label="Dashboard" >Withdrawals </Link>
          {/* <Link href="/affiliate/dashboard/settings" label="Settings" >Settings</Link> */}
          {/* <NavLink href="/dashboard/shipping" label="Shipping Address" /> */}
          {/* <NavLink href="/dashboard/orders" label="Orders" /> */}

        </ul>
      </AnimatedBlock>
    </div>

  )
}

export default DashboardLeft