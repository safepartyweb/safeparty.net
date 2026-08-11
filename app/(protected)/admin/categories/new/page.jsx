"use client";
import { useState } from "react";
import { useCreateCategoryMutation } from "@/lib/api/categoryApi";
import Loader from "@/components/Loader";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';



export default function AddProduct() {
  const [name, setName] = useState('')
  const [order, setOrder] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const [createCategory, {isLoading}] = useCreateCategoryMutation();
  const router = useRouter();
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true)

    const data = {
      name,
      order,
    }

    // console.log("data",data)


    try {
      const apiRes =  await createCategory(data).unwrap();
      // const apiRes = await fetch('/api/category/',{
      //   method:"POST",
      //   body:JSON.stringify(data)
      // })
      console.log("apiRes",apiRes)
      toast.success("Category added successfully.")
      setName('')
    } catch (error) {
      console.log("Error", error)
      if(error.status == 409){
        return toast.error(error.data.message)
      }
      toast.error("Something went wrong, please try again.")
    } finally{
      setShowLoader(false)
    }
    

  };

  return (
    <div className="new_product p-0 md:p-6 bg-white rounded shadow">
      {showLoader && <Loader /> }
      <h1 className="text-xl font-bold mb-4">Add New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        

        <div className="input_group">
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value) }
            className="border rounded w-full px-3 py-2 mt-2"
            placeholder="Category Name"
          />
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


        <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer">Add Category</button>

      </form>
    </div>
  );
}
