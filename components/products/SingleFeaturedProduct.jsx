import React from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import Link from 'next/link'
import Image from 'next/image';



const SingleFeaturedProduct = ({product}) => {
  
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.title,
      image: product.images[0]?.url,
      price: product.price,
      quantity: 1,
    }));

    toast.success("Added to cart!")

  };


  return (
    <div  className=" flex gap-6 flex-col justify-center items-center">
            
    <div className="img_wrap h-auto xl:h-[280px] p-4 md:p-6 mb-4">
      <Image className='rounded max-h-[280px] w-auto' src={product.images[0]?.url} alt="product image" width={200} height={200} />
    </div>
  
    <div className="product_meta">
      <h3 className="product_title font-bold text-xl text-center">{product.title}</h3>
      <p className="product_price font-bold text-lg text-center">${product.price}</p>
      <div className="btn_wrap flex flex-row sm:flex-col md:flex-row lg:flex-col xl:flex-row gap-3 items-center justify-center mt-6">
        <Link className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-2 font-bold font-lg inline-block cursor-pointer max-w-[175px] text-center' href={`/products/${product.slug}`}>View Details</Link>
        <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-2 font-bold font-lg inline-block cursor-pointer max-w-[175px] text-center" onClick={handleAddToCart}>Add to cart </button>
      </div>
    </div>
  </div>
  )
}

export default SingleFeaturedProduct