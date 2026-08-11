'use client'
import React, { use, useState, useEffect } from 'react';
import { useGetCategoryByIdQuery, useEditCategoryMutation } from '@/lib/api/categoryApi';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const page = ({params}) => {
  const { catId } = use(params); 
  const {data, isLoading,isError, error} = useGetCategoryByIdQuery({catId})
  const [editCategory, {isLoading: editLoading}] = useEditCategoryMutation()
  const [name, setName] = useState('')
  const [order, setOrder] = useState('')

  const router = useRouter();



  useEffect(() => {

    if(data){
      setName(data.category.name)
      setOrder(data.category.order ? data.category.order : 0 )
    }

  },[data])



  if(isLoading){
    return <Loader />
  }

  if(isError){
    console.log("Eroror", error)
  }

  console.log("data",data)

  const editCategoryHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      catId,
      order
    }

    try {
      const apiRes = await editCategory(data);
      console.log("apiRes: ", apiRes)
      toast.success("Edited successfully")
      setTimeout(() => {
        router.push('/admin/categories');
      }, 1500);
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong!")
    }
    



  }



  return (
    <div>
      <h1>Edit Category: {data.category.name}</h1>
      
      <form onSubmit={editCategoryHandler} className="mt-4" action="">
        <div className="form_group flex gap-1 flex-col">
          <label htmlFor="name" className='text-lg font-medium'>New Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded w-full px-3 py-2 mt-2"  />
        </div>
        
        <div className="input_group">
          <label className="block font-medium">Category Order</label>
          <input
            type="text"
            name="title"
            value={order}
            onChange={(e) => setOrder(e.target.value) }
            className="border rounded w-full px-3 py-2 mt-2"
            placeholder="Category order"
          />
        </div>




        <button    type="submit"  className="mt-2 bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer" >
        Update Category
      </button>

      </form>
    </div>
  )
}

export default page