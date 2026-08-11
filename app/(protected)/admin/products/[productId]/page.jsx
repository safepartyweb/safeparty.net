'use client'
import React,{useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetSingleProductQuery } from '@/lib/api/productApi'
import Loader from '@/components/Loader'
import ThumbnailSlider from '@/components/ThumbnailSlider'
import BlackButton from '@/components/BlackButton'

const page = () => {
  const {productId} = useParams()
  // console.log("Product Id:", productId )
  const {data, isLoading} = useGetSingleProductQuery({productId})

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  
  // Remove existing image
  const removeExistingImage = (id) => {
    setImages(images.filter(img => img._id !== id));
  };
  
  // Upload new image
  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };  


  useEffect(()=> {
    if(data){
      setImages(data.product.images)
    }
   
  },[isLoading, data])

  if(isLoading){
    return <Loader />
  }
  console.log("Product data",data)
  const product = data.product;

  return (
    <div>
      
      <div className="product_title flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
        <h1 className='text-2xl font-bold'>{product.title}</h1>
        <BlackButton link={`/admin/products/edit/${product._id}`}>Edit Product</BlackButton>
      </div>

      <div className="product_wrap grid grid-cols-2 gap-16 ">
        
        <div className="images col-span-2 lg:col-span-1 ">
          <ThumbnailSlider images={product.images} />
        </div>

        <div className="prod_details ">
          
          <p className="text-lg font-medium">Price: {product.price}</p>
          <p className="text-lg font-medium">Details: {product.description}</p>
          <p className="text-lg font-medium">Best Seller? {product.bestSeller ? 'Yes' : 'No'}</p>
        </div>

      </div>
    </div>
  )
}

export default page