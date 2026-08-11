'use client'
import React,{useState, useEffect} from 'react'
import { useGetPaginatedOrdersQuery } from '@/lib/api/customerApi'
import Loader from '@/components/Loader'
import ReactPaginate from 'react-paginate';
import CustomerOrders from '@/components/dashboards/CustomerOrders'



const page = () => {
  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [totalCount, setTotalCount] = useState()
  const [orders, setOrders] = useState()

  const limit = 10;
  const {data,isLoading} = useGetPaginatedOrdersQuery({page,limit})

  useEffect(() => {
    
    if(data){
      // console.log("data arrived!",data)
      setOrders(data.orders)
      setTotalPages(data.totalPages || 1)
      setTotalCount(data.totalCount || 0)
    }

  },[data])

  if(isLoading){
    return <Loader />
  }

  console.log("dta",data)

  return (
    <>
      <div className="recent_orders my-4 overflow-x-auto ">
        <h2 className='text-lg font-medium mb-4'>All Orders ({data.totalCount})</h2>
        
        <div className='min-w-[500px] '>
          <div className="orders_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
            <div className="prod_sl flex-1">SL.</div>
            <div className="prod_sl flex-1">Date</div>
            <div className="title flex-1">Amount</div>
            <div className="title flex-1">Status</div>
            <div className="title flex-1">Payment</div>
            <div className="title flex-1 flex justify-end">Actions</div>
          </div>
          <CustomerOrders orders={data.orders} page={page} limit={limit} />
          
          
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



      {/* {totalPages && totalPages > 1 && (
        <div className="pagination mt-6 flex justify-center items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed "
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded cursor-pointer ${page === pageNumber ? 'bg-black text-white' : ''}`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Next 
          </button>
        </div>
      )} */}

      
      
    </>
  )
}

export default page