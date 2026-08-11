'use client'
import React,{useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import VerDot from '@/images/verticaldots.svg'
import Link from 'next/link'
import AnimatedBlock from '@/components/shared/MotionParent'
import { useDeleteCategoryMutation } from '@/lib/api/categoryApi'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';




const SingleCategory = ({cat,sl}) => {
  
  console.log("Category from single category Item:", cat)
  const divRef = useRef(null);
  
  const [showOptions, setShowOptions] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [deleteCategory , isLoading] = useDeleteCategoryMutation()
  const router = useRouter();

  const showOptionsHandler = () => {
    console.log("clicked!")
    setShowOptions(!showOptions)
  }

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowOptions(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const deleteHandler = async (id) => {
    const data = {
      catId: id
    }

    try {
      const apiRes = await deleteCategory(data)
      console.log("apiRes", apiRes)
      setShowDelete(false)
      toast.success("Deleted successfully!")
      setTimeout(() => {
        router.push('/admin/categories');
      }, 1000);

    } catch (error) {
      console.log("Error:",error)
      toast.success("Something went wrong!")
    }

    
  }

  return (
    <div className=''>
      <AnimatedBlock direction="up">
        <div className='flex gap-2 justify-between items-center border-b border-gray-500 pb-4'>
          <div className="prod_sl flex-1">{sl+1}.</div>

          <div className="title flex-6">{cat.name}</div>
          
          <div ref={divRef} className="title flex-1 flex justify-center relative">
            <Image onClick={showOptionsHandler} className='cursor-pointer verticaldots' src={VerDot} width={12} height={42} alt="Vertical Dot" />
            {showOptions && <div  className="options absolute top-[110%] right-0 bg-gray-700 p-6 min-w-[200px] text-white rounded z-10">
              <ul>
                <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
                  <Link href={`/admin/categories/edit/${cat._id}`}>Edit</Link>
                </li>
                <li onClick={() => setShowDelete(true)} className='py-2 border-b border-gray-300 w-full cursor-pointer'>Delete</li>
              </ul>
            </div>}
            
          </div>

        </div>
      </AnimatedBlock>

      {showDelete && (

      
        <div className="overlay fixed w-full top-0 left-0 h-full flex items-center justify-center backdrop-blur-[2px]  z-[50]">

          <div className="modal_innder bg-red-700 p-6 flex flex-col gap-4 items-center justify-center text-white min-h-[350px] min-w[300px]">
                <h2 className='text-2xl font-medium'>Really want to delete the "{cat.name}"? Can't undone!</h2>
                <div className="cta flex gap-4">
                  <button onClick={() => {deleteHandler(cat._id)}} className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white  px-6 py-3 font-bold font-lg inline-block cursor-pointer hover:text-red-700'>Yes Delete</button>
                  <button onClick={() => setShowDelete(false)} className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer'>Cancel</button>
                </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default SingleCategory