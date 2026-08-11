import React from 'react'
import Link from 'next/link'

const BlackButton = ({text="Click me!", link="#", children = "Click me!"}) => {
  return (
    <Link className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block' href={link}>{children}</Link>
  )
}

export default BlackButton