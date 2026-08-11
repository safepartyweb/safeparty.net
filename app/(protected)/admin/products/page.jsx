'use client'
import React from 'react'
import BlackButton from '@/components/BlackButton'
import { useGetProductsQuery } from '@/lib/api/productApi'
import Loader from '@/components/Loader'
import SingleProductItem from '@/components/admin/product/SingleProductItem'


const ProductsPage = () => {

  const {data, isLoading} = useGetProductsQuery();

  if(isLoading){
    return <Loader />
  }

  console.log("Products Data", data)
  const products = data.products;

  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between ">
        <h1 className='text-xl font-bold'>Products</h1>
        <div className="buttn_wrap"><BlackButton link="/admin/products/new">Add New Product</BlackButton></div>
      </div>

      <div className="products_list">
        <h1 className='text-lg font-semibold'>All Products</h1>
        
        <div className="products_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
          <div className="prod_sl flex-1">SL.</div>
          <div className="prod_img flex-3">Image</div>
          <div className="title flex-6">Title</div>
          <div className="title flex-3">Price</div>
          <div className="title flex-3">Best Seller</div>
          <div className="title flex-1 flex justify-center">Actions</div>
        </div>
        
        <div className="prod_wrap flex flex-col gap-4">
          {products.map((item,index) => <SingleProductItem key={index} prod={item} sl={index} /> )}
        </div>

      </div>
      
    </div>
  )
}

export default ProductsPage