'use client'
import React,{useState, useEffect} from 'react'
import { useGetOrdersQuery } from '@/lib/api/orderApi'
import Loader from '@/components/Loader'
import SingleOrderItem from '@/components/admin/orders/SingleOrderItem'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate';


const page = () => {
  const user = useSelector(state => state.auth.userInfo);
  console.log("user from auth", user)

  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [totalCount, setTotalCount] = useState()
  const [orders, setOrders] = useState()

  
  /*
  if (!user) {
    // Optional: show a loading state or redirect
    if (typeof window !== 'undefined') {
      router.push('/admin-login');
    }
    return null;
  }
    */
  const limit = 20;
  const {data, isLoading, isError, error} = useGetOrdersQuery({page,limit})

  useEffect(() => {
    
    if(data){
      // console.log("data arrived!",data)
      setOrders(data.orders)
      setTotalPages(data.totalPages || 1)
      setTotalCount(data?.totalCount || 0)
    }

  },[data])


  const [showLoader, setShowLoader] = useState(false)


  

  if(isError){
    console.log("error", error)
  }

  if(isLoading){
    return <Loader />
  }


  // console.log("orders data",data)
  // const orders = data?.orders;
  // console.log("Orders", orders)

  // if(orders.length == 0){
  //   return 'No order found!'
  // }

  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between ">
        <h1 className='text-xl font-bold'>Orders</h1>
        {/* <div className="buttn_wrap"><BlackButton link="/admin/products/new">Add New Product</BlackButton></div> */}
      </div>

      <div className="products_list overflow-x-auto">
        
        <h1 className='text-lg font-semibold'>All Orders ({data?.totalCount})</h1>
        
        <div className="min-w-[600px] mb-24">
          
          <div className="products_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
            <div className="prod_sl flex-1">SL.</div>
            <div className="prod_sl flex-[1.5]">Date</div>
            <div className="prod_img flex-[2.5]">Customer Name</div>
            {/* <div className="title flex-6">Title</div> */}
            <div className="title flex-3">Amount</div>
            <div className="title flex-3">Status</div>
            <div className="title flex-3">Payment</div>
            {/* <div className="title flex-3">Best Seller</div> */}
            <div className="title flex-1 flex justify-center">Actions</div>
          </div>
          
          <div className="prod_wrap flex flex-col gap-4">
            { orders && orders.map((item,index) => <SingleOrderItem key={index} order={item} sl={page > 1 ?(page - 1)*limit+(index+1) : index+1} /> )}
          </div>

        </div>

      </div>

      <ReactPaginate
        previousLabel={'← Prev'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={({ selected }) => setPage(selected + 1)}
        containerClassName={'pagination flex gap-2 mt-4 justify-center'}
        activeClassName={'bg-black text-white px-3 py-1 rounded'}
        pageClassName={'px-3 py-1 border rounded cursor-pointer'}
        previousClassName={'px-3 py-1 border rounded cursor-pointer'}
        nextClassName={'px-3 py-1 border rounded cursor-pointer'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />



    </div>
  )
}

export default page