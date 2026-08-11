import React from 'react'
import Image from 'next/image'
import ProductImage from '../../images/products/bubblegum.gif'
import ProductImage2 from '../../images/products/Raspberry.gif'
import BlackButton from '../BlackButton'
import AnimatedBlock from '../shared/MotionParent'
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import Link from 'next/link'
import SingleFeaturedProduct from './SingleFeaturedProduct'





const NewArrivals = ({productsData}) => {


  const products = productsData.products;
  // console.log("productsL:", products)
  const newArrivals = products.slice(0,6);
  // console.log("newArrivals", newArrivals)
 
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


    <section className='sec_new_arrivals py-6 md:py-10 '>
      <div className='container max-w-sitemax px-4 mx-auto '>
        <h2 className='text-3xl md:text-5xl font-bold text-center mb-10'>New Arrivals</h2>
        <div className="prodcuts_wrap flex gap-5 md:gap-8 justify-center flex-wrap ">
          
        {newArrivals.map(product=> <AnimatedBlock key={product._id} direction='up' className=' w-full sm:w-[45%] lg:w-[23%] single_product border border-siteBlack rounded p-4 md:p-6'>
           <SingleFeaturedProduct product={product} />
          </AnimatedBlock> )}
        </div>
        
      </div>
    </section>
  )
}

export default NewArrivals