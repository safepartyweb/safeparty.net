'use client'
import React, { useState, useEffect } from 'react'
import { useGetOrdersQuery } from '@/lib/api/orderApi'
import Loader from '@/components/Loader'
import SingleOrderItem from '@/components/admin/orders/SingleOrderItem'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'

const Page = () => {
  const user = useSelector(state => state.auth.userInfo)
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')       // What you type in the input field
  const [searchQuery, setSearchQuery] = useState('')       // What actually triggers the fetch
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [orders, setOrders] = useState([])

  const limit = 20

  const { data, isLoading, isError, error } = useGetOrdersQuery({ 
    page, 
    limit, 
    search: searchQuery 
  })

  useEffect(() => {
    if (data) {
      setOrders(data.orders || [])
      setTotalPages(data.totalPages || 1)
      setTotalCount(data?.totalCount || 0)
    }
  }, [data])

  // Handle Search Trigger Button
  const handleSearchClick = (e) => {
    e.preventDefault()
    setPage(1) // Reset back to page 1 for new search results
    setSearchQuery(searchInput)
  }

  // Optional: Clear search back to original state
  const handleClearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
    setPage(1)
  }

  if (isError) {
    console.log("error", error)
  }

  if (isLoading && !orders.length) {
    return <Loader />
  }

  return (
    <div>
      <div className="products_header_wrap flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className='text-xl font-bold'>Orders</h1>
        
        {/* Search Bar Input & Button Form */}
        <form onSubmit={handleSearchClick} className="search_wrap flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name, price, order #..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-72 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="products_list overflow-x-auto">
        <h1 className='text-lg font-semibold mb-4'>All Orders ({totalCount})</h1>
        
        <div className="min-w-[600px] mb-24">
          <div className="products_header flex gap-2 justify-between mb-6 border-b border-gray-400 pb-4">
            <div className="prod_sl flex-1">SL.</div>
            <div className="prod_sl flex-[1.5]">Date</div>
            <div className="prod_img flex-[2.5]">Customer Name</div>
            <div className="title flex-3">Amount</div>
            <div className="title flex-3">Status</div>
            <div className="title flex-3">Payment</div>
            <div className="title flex-1 flex justify-center">Actions</div>
          </div>
          
          <div className="prod_wrap flex flex-col gap-4">
            {orders && orders.length > 0 ? (
              orders.map((item, index) => (
                <SingleOrderItem 
                  key={item._id || index} 
                  order={item} 
                  sl={page > 1 ? (page - 1) * limit + (index + 1) : index + 1} 
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No orders found.</div>
            )}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={'← Prev'}
          nextLabel={'Next →'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          forcePage={page - 1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          containerClassName={'pagination flex gap-2 mt-4 justify-center'}
          activeClassName={'bg-black text-white px-3 py-1 rounded'}
          pageClassName={'px-3 py-1 border rounded cursor-pointer'}
          previousClassName={'px-3 py-1 border rounded cursor-pointer'}
          nextClassName={'px-3 py-1 border rounded cursor-pointer'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      )}
    </div>
  )
}

export default Page