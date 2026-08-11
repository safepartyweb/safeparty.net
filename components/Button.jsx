import React from 'react'
import Link from 'next/link'

const Button = ({text="Click me!", link="#", children = "Click me!"}) => {
  return (
    <Link className='bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 block font-bold font-lg inline-block' href={link}>{children}</Link>
  )
}

export default Button