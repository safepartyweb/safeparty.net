'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  useGetSingleOrderQuery,
  useEditOrderMutation,
} from '@/lib/api/orderApi';
import Loader from '@/components/Loader';
import Image from 'next/image';
import dayjs from 'dayjs';
import BlackButton from '@/components/BlackButton';
import { toast } from 'react-toastify';

const Page = () => {
  const { orderId } = useParams();

  const [showEdit, setShowEdit] = useState(false);
  const [payment, setPayment] = useState('');
  const [status, setStatus] = useState('');

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetSingleOrderQuery(
    { orderId },
    {
      skip: !orderId,
    }
  );

  const [editOrder, { isLoading: editLoading }] = useEditOrderMutation();

  const order = data?.order || data?.data?.order || data || null;
  const user = order?.user || {};
  const shippingAddress = order?.shippingAddress || {};

  const shippingInfo =
    order?.shippingSnapshot ||
    order?.shippingMethod ||
    null;

  useEffect(() => {
    if (order) {
      setPayment(String(order.isPaid));
      setStatus(order.status || 'Pending');
    }
  }, [order]);

  const editOrderHandler = async (e) => {
    e.preventDefault();

    const updateData = {
      status,
      isPaid: payment === 'true',
      orderId,
    };

    try {
      const apiRes = await editOrder(updateData).unwrap();

      console.log('apiRes', apiRes);
      toast.success('Order updated!');
      setShowEdit(false);
    } catch (error) {
      console.log('Error:', error);
      toast.error(error?.data?.message || 'Something went wrong!');
      setShowEdit(false);
    }
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <BlackButton link="/admin/orders">Back to orders</BlackButton>

        <div className="mt-6 border border-red-300 bg-red-50 text-red-700 p-4 rounded">
          <h1 className="font-bold mb-2">Failed to load order</h1>
          <p>{error?.data?.message || 'Something went wrong.'}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <BlackButton link="/admin/orders">Back to orders</BlackButton>

        <div className="mt-6 border border-yellow-300 bg-yellow-50 text-yellow-700 p-4 rounded">
          <h1 className="font-bold mb-2">Order not found</h1>
          <p>No order data was returned from the API.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <BlackButton link="/admin/orders">Back to orders</BlackButton>

        <button
          onClick={() => setShowEdit(true)}
          className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer"
        >
          Edit Order
        </button>
      </div>

      <h1 className="text-xl font-bold mt-6">Order Details</h1>

      <div className="border-b pb-4 mb-6">
        <h1 className="text-lg font-medium">Order #{order._id}</h1>

        <p className="text-sm text-gray-600">
          <span className="font-bold">Placed on:</span>{' '}
          {order.createdAt
            ? dayjs(order.createdAt).format('DD MMM, YYYY')
            : 'N/A'}
        </p>

        <div className="mt-2">
          <span className="font-bold">Status: </span>

          <span
            className={`px-2 py-1 text-sm rounded ${
              order.status === 'Delivered'
                ? 'bg-green-100 text-green-700'
                : order.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-700'
                : order.status === 'Cancelled'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="mt-3">
          <span className="font-bold">Payment: </span>

          <span
            className={`px-2 py-1 text-sm rounded ${
              order.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {order.isPaid ? 'Paid' : 'Not Paid'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Customer Information</h2>

        <p>{user.fullName || shippingAddress.name || 'N/A'}</p>

        {user.email && <p>Email: {user.email}</p>}

        {user.phone && <p>Phone: {user.phone}</p>}
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>

        <p>{shippingAddress.name || user.fullName || 'N/A'}</p>

        <p>
          {shippingAddress.address || 'N/A'}
          {shippingAddress.city ? `, ${shippingAddress.city}` : ''}
          {shippingAddress.state ? `, ${shippingAddress.state}` : ''}
          {shippingAddress.postalCode
            ? `, ${shippingAddress.postalCode}`
            : ''}
          {shippingAddress.country ? `, ${shippingAddress.country}` : ''}
        </p>
      </div>

      {shippingInfo && (
        <div className="mb-6 border p-4 rounded bg-gray-50 max-w-md">
          <h2 className="font-semibold text-lg mb-2">Shipping Method</h2>

          <p className="font-bold">
            {shippingInfo.name || 'N/A'}
          </p>

          {shippingInfo.shortNote && (
            <p className="text-sm text-gray-700 mt-1">
              {shippingInfo.shortNote}
            </p>
          )}

          {shippingInfo.deliveryTime && (
            <p className="text-sm mt-1">
              <span className="font-semibold">Delivery Time:</span>{' '}
              {shippingInfo.deliveryTime}
            </p>
          )}

          <p className="text-sm mt-1">
            <span className="font-semibold">Shipping Price:</span> $
            {Number(
              shippingInfo.price || order.shippingPrice || 0
            ).toFixed(2)}
          </p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Items in this Order</h2>

        {order.orderItems?.length > 0 ? (
          order.orderItems.map((item, index) => (
            <div key={index} className="flex gap-4 border-b py-3">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name || 'Product image'}
                  width={60}
                  height={60}
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  No image
                </div>
              )}

              <div className="flex-grow">
                <p className="font-medium">
                  {item.name}
                  {item.isVariable && item.variationLabel
                    ? ` - ${item.variationLabel}`
                    : ''}
                </p>

                <p className="text-sm">
                  Qty: {item.quantity} × ${Number(item.price || 0).toFixed(2)}
                </p>
              </div>

              <p className="font-semibold">
                ${Number((item.price || 0) * (item.quantity || 0)).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No order items found.</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded shadow-sm max-w-md">
        <h2 className="font-semibold text-lg mb-3">Payment Summary</h2>

        <div className="flex justify-between mb-1">
          <span>Subtotal:</span>
          <span>${Number(order.itemsPrice || 0).toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-1">
          <span>Shipping Fee:</span>
          <span>${Number(order.shippingPrice || 0).toFixed(2)}</span>
        </div>

        {Number(order.discount || 0) > 0 && (
          <div className="flex justify-between mb-1">
            <span>Discount:</span>
            <span>-${Number(order.discount || 0).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between mb-1">
          <span>Tax:</span>
          <span>${Number(order.taxPrice || 0).toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>${Number(order.totalPrice || 0).toFixed(2)}</span>
        </div>
      </div>

      {showEdit && (
        <div className="overlay fixed w-full h-full top-0 left-0 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
          <div className="modal_inner flex flex-col justify-center w-full max-w-[500px] p-6 bg-siteGray text-white rounded">
            <h1 className="text-center text-2xl font-bold mb-6">
              Edit Order
            </h1>

            <form onSubmit={editOrderHandler} className="mb-6">
              <p className="text-lg font-bold mb-4">
                Change Payment Status
              </p>

              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="mb-4 border border-white p-4 text-black bg-white w-full"
              >
                <option value="">Select One</option>
                <option value="true">Paid</option>
                <option value="false">Not Paid</option>
              </select>

              <p className="text-lg font-bold mt-4 mb-4">
                Change Order Status
              </p>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mb-4 border border-white p-4 text-black bg-white w-full"
              >
                <option value="">Select One</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 block font-bold font-lg cursor-pointer"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="bg-white text-siteBlack border border-white rounded hover:bg-siteBlack hover:text-white px-6 py-3 block font-bold font-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {editLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;