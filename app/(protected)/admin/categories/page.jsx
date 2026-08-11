'use client'

import React from 'react'
import BlackButton from '@/components/BlackButton'
import { useGetCategoriesQuery } from '@/lib/api/categoryApi'
import Loader from '@/components/Loader'
import SingleCategory from '@/components/admin/category/SingleCategory'




const page = () => {


  const {data, isLoading } = useGetCategoriesQuery();
  if(isLoading){
    return <Loader />
  }

  console.log("data",data)

  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between ">
        <h1 className='text-xl font-bold'>Categories</h1>
        <div className="buttn_wrap"><BlackButton link="/admin/categories/new">Add New Category</BlackButton></div>
      </div>

      <div className="products_list">
        <h1 className='text-lg font-semibold'>All Categories</h1>
        
        <div className="products_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
          <div className="prod_sl flex-1">SL.</div>
          <div className="title flex-6">Title</div>
        </div>
        
        <div className="prod_wrap flex flex-col gap-4">
          {data.map((item,index) => <SingleCategory key={index} cat={item} sl={index} /> )}
        </div>

      </div>
      
    </div>
  )
}

export default page