import React from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import Link from 'next/link';
import Image from 'next/image';



const HeroSlideSingleProduct = ({product}) => {
  
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
    <div className="single_slide flex flex-col gap-4 items-center justify-center h-full bg-siteBlack text-white py-8 lg:py-0">
    <Image className='rounded' src={product.images[0].url} alt="Product Image" width={200} height={200} />
    <div className="product_meta flex gap-0 flex-col justify-center">
      <p className="slide_title text-center text-uppercase font-bold">{product.title}</p>
      <p className="slide_description text-center font-bold">${product.price}</p>
      <div className="btn_wrap flex flex-row sm:flex-col md:flex-row lg:flex-col xl:flex-row gap-3 items-center justify-center mt-6">
          <Link className='bg-gray-300 text-siteBlack border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-2 font-bold font-lg inline-block cursor-pointer max-w-[175px] text-center' href={`/products/${product.slug}`}>View Details</Link>
          <button className="bg-gray-300 text-siteBlack border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-2 font-bold font-lg inline-block cursor-pointer max-w-[175px] text-center" onClick={handleAddToCart}>Add to cart </button>
        </div>
      
    </div>
  </div>
  )
}

export default HeroSlideSingleProduct