import React,{useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import VerDot from '@/images/verticaldots.svg'
import Link from 'next/link'
import AnimatedBlock from '@/components/shared/MotionParent'
import { useDeleteProductMutation } from '@/lib/api/productApi'
import { toast } from 'react-toastify'



const SingleProductItem = ({prod,sl}) => {
  
  // console.log("Product from single Product Item:", prod)
  const divRef = useRef(null);
  
  const [showOptions, setShowOptions] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const showOptionsHandler = () => {
    console.log("clicked!")
    setShowOptions(!showOptions)
  }

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowOptions(false)
    }
  };

  const [deleteProduct , {isLoading}] = useDeleteProductMutation()

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const prodDeleteHandler = async () => {
    const data = {
      productId:prod._id
    }

    try {
      const apiRes = await deleteProduct(data).unwrap();
      console.log("apiRes",apiRes)
      toast.success("Product deleted successfully!")
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong!")
    }finally{
      setShowDelete(false)
    }

    



  }

  return (
    <AnimatedBlock direction="up">
    <div className='flex gap-2 justify-between items-center border-b border-gray-500 pb-4'>
      <div className="prod_sl flex-1">{sl+1}.</div>
      <div className="prod_img flex-3"> {prod.images[0] ? <Image src={prod.images[0].url} alt="Product Image" width={50} height={50} /> :'No image'}   </div>
      <div className="title flex-6">{prod.title}</div>
      <div className="title flex-3">{prod.price}</div>
      <div className="title flex-3">{prod.bestSeller ? "Yes" : "No"}</div>
      <div ref={divRef} className="title flex-1 flex justify-center relative">
        <Image onClick={showOptionsHandler} className='cursor-pointer verticaldots' src={VerDot} width={12} height={42} alt="Vertical Dot" />
        {showOptions && <div  className="options absolute top-[110%] right-0 bg-gray-700 p-6 min-w-[200px] text-white rounded z-10">
          <ul>
            
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link href={`/admin/products/edit/${prod._id}`}>Edit</Link>
            </li>
            {/* <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>Draft</li> */}
            <li onClick={e => setShowDelete(true)} className='py-2 border-b border-gray-300 w-full cursor-pointer'>Delete</li>
          </ul>
        </div>}
        
      </div>

    </div>
    {showDelete && (
      <div className="modal fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center">
        <div className="modal_inner max-w-[450px] bg-gray-700 rounded border px-6 py-8 ">
          <h2 className="text-2xl text-white text-center">Are you sure to Delete? You can't undo this.</h2>
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={e => setShowDelete(false)} className='bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer'>Cancel</button>
            <button onClick={prodDeleteHandler} className='bg-black text-white px-4 py-2 rounded border hover:bg-red-500 hover:text-black cursor-pointer'>Delete</button>
          </div>
        </div>
      </div>
    )}

    </AnimatedBlock>
  )
}

export default SingleProductItem