'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { clearCart } from '@/store/cartSlice';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useGetOrdersQuery } from '@/lib/api/customerApi';

export default function CheckoutPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [isFirstOrder, setIsFirstOder] = useState(false);

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingMethodsLoading, setShippingMethodsLoading] = useState(true);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading: isOrdersLoading } = useGetOrdersQuery();

  const selectedShippingMethod = shippingMethods.find(
    (method) => method._id === selectedShippingMethodId
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=checkout');
    }
  }, [userInfo, router]);

  useEffect(() => {
    if (userInfo) {
      setForm((prev) => ({
        ...prev,
        name: userInfo.fullName || '',
        email: userInfo.email || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        postalCode: userInfo.postalCode || '',
        country: userInfo.country || '',
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    async function loadShippingMethods() {
      try {
        setShippingMethodsLoading(true);

        const res = await fetch('/api/admin/shipping', {
          method: 'GET',
          cache: 'no-store',
        });

        const result = await res.json();
        
        console.log("Method Result:", result)

        if (!res.ok) {
          throw new Error(result.message || 'Failed to load shipping methods');
        }

         

        const methods = result.methods || [];
        const activeMethods = methods.filter(method => method.isActive)

        setShippingMethods(activeMethods);

        if (methods.length > 0) {
          setSelectedShippingMethodId(activeMethods[0]._id);
        }
      } catch (error) {
        console.error('Shipping methods load error:', error);
        toast.error(error.message || 'Failed to load shipping methods');
      } finally {
        setShippingMethodsLoading(false);
      }
    }

    loadShippingMethods();
  }, []);

  useEffect(() => {
    if (data?.orders?.length === 0) {
      setIsFirstOder(true);
    }
  }, [data]);

  useEffect(() => {
    const calculated = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setSubTotal(calculated);

    let discountAmount = 0;

    if (data?.orders?.length === 0) {
      // First order discount can be added here later.
      discountAmount = (calculated * 20) / 100;
    }

    setDiscount(discountAmount);

    const selectedShippingPrice = Number(selectedShippingMethod?.price || 0);

    setShipping(selectedShippingPrice);
    setOrderPrice(calculated - discountAmount + selectedShippingPrice);
  }, [cartItems, data, selectedShippingMethod]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShippingMethodChange = (e) => {
    setSelectedShippingMethodId(e.target.value);
  };

  if (!userInfo || isOrdersLoading || shippingMethodsLoading) {
    return <Loader />;
  }

  if (cartItems.length === 0 && !showPaymentOptions) {
    return (
      <div className="text-center py-10">
        <p>Your cart is empty.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to shopping
        </Link>
      </div>
    );
  }

  const placeOrderHandler = async (e) => {
    e.preventDefault();
  
    if (!selectedShippingMethod) {
      toast.error("Please select a shipping method.");
      return;
    }
  
    setShowLoader(true);
  
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: form,
  
          shippingMethod: selectedShippingMethod._id,
  
          shippingSnapshot: {
            name: selectedShippingMethod.name,
            shortNote: selectedShippingMethod.shortNote || "",
            price: Number(selectedShippingMethod.price || 0),
            deliveryTime: selectedShippingMethod.deliveryTime || "",
          },
  
          itemsPrice: subTotal,
          discount,
          shippingPrice: shipping,
          taxPrice,
          totalPrice: orderPrice,
          userId: userInfo.id,
          referredBy: userInfo.referredBy,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
      }
  
      toast.success("Order created successfully!");
  
      const orderId = data._id;
      setOrderId(orderId);
      setShowPaymentOptions(true);
    } catch (error) {
      console.error("❌ Error creating order:", error);
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  const paymentHandler = async (method) => {
    setShowLoader(true);

    try {
      const externalApiRes = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          price_amount: orderPrice,
          price_currency: 'usd',
          order_id: orderId,
          payment_method: method,
          email: userInfo.email,
          discount,
        }),
      });

      if (!externalApiRes.ok) {
        throw new Error('Something went wrong!');
      }

      const paymentLinkData = await externalApiRes.json();

      if (paymentLinkData?.data?.invoice_url) {
        toast.success('Redirecting to payment processor!');
        window.location.href = paymentLinkData.data.invoice_url;
      } else {
        toast.success('Payment instruction sent to your email!');
        setShowPaymentOptions(false);
      }
    } catch (error) {
      console.error('Something went wrong', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setShowLoader(false);
      dispatch(clearCart());
    }
  };

  const closePaymentOptionsHandler = () => {
    dispatch(clearCart());
    setShowPaymentOptions(false);
  };

  // console.log("Checkout page data:",data)

  return (
    <div className="max-w-5xl mx-auto p-4 relative">
      {showLoader && <Loader />}

      {showOrderSuccess && (
        <div className="orderSuccessScreen flex flex-col gap-10 items-center justify-center absolute w-full h-full z-20 bg-white">
          <div>
            <h1 className="text-xl font-bold text-center">
              Order successful!
            </h1>
            <p className="text-lg font-medium text-center">
              Redirect you to payment page in a moment!
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={placeOrderHandler} className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Shipping Methods */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">Shipping Method</h2>

            {shippingMethods.length === 0 ? (
              <div className="border border-red-300 bg-red-50 text-red-700 p-3 rounded text-sm">
                No shipping method is available right now. Please contact
                support before placing an order.
              </div>
            ) : (
              <div className="space-y-3">
                {shippingMethods.map((method) => {
                  const methodPrice = Number(method.price || 0);

                  const isSelected = selectedShippingMethodId === method._id;

                  return (
                    <label
                      key={method._id}
                      htmlFor={`shipping-${method._id}`}
                      className={`block cursor-pointer rounded border p-4 transition ${
                        isSelected
                          ? 'border-siteBlack bg-white shadow-sm'
                          : 'border-gray-300 bg-white hover:border-siteBlack'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={`shipping-${method._id}`}
                          type="radio"
                          name="shippingMethod"
                          value={method._id}
                          checked={isSelected}
                          onChange={handleShippingMethodChange}
                          required
                          className="mt-1"
                        />

                        <div className="w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-bold text-base">
                              {method.name}
                            </h3>

                            <span className="font-bold text-siteBlack">
                              ${methodPrice.toFixed(2)}
                            </span>
                          </div>

                          {method.description && (
                            <p className="text-sm text-gray-700 mt-2">
                              {method.description}
                            </p>
                          )}

                          {method.shortNote && (
                            <p className="text-sm text-gray-600 mt-1">
                              {method.shortNote}
                            </p>
                          )}

                          {method.deliveryTime && (
                            <p className="text-sm font-medium mt-2">
                              Delivery time: {method.deliveryTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="btn_wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={shippingMethods.length === 0 || showLoader}
              className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>

            <Link
              className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer"
              href="/cart"
            >
              Go back to Cart
            </Link>
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center gap-4">
                <span>
                  {item.name}
                  {item.isVariable ? ` - ${item.variation.label}` : ''} (
                  {item.price} × {item.quantity})
                </span>

                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="text-lg font-semibold flex justify-between">
            <span>Sub Total:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="text-lg font-semibold flex justify-between">
              <span>Discount:</span>
              <span>${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="text-lg font-semibold flex justify-between">
            <span>
              Shipping:
              {selectedShippingMethod?.name
                ? ` ${selectedShippingMethod.name}`
                : ''}
            </span>

            <span>${shipping.toFixed(2)}</span>
          </div>

          {selectedShippingMethod?.deliveryTime && (
            <p className="text-sm text-gray-600 mt-1">
              Estimated delivery: {selectedShippingMethod.deliveryTime}
            </p>
          )}

          <hr className="my-4" />

          <div className="text-lg font-bold flex justify-between">
            <span>Total:</span>
            <span>${orderPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showPaymentOptions && (
        <div className="modal fixed top-0 left-0 w-full h-full backdrop-blur-sm p-4 flex items-center justify-center z-[60]">
          <div className="modal_inner w-full max-w-[550px] bg-green-600 px-4 py-8 rounded text-white relative">
            <Image
              onClick={closePaymentOptionsHandler}
              className="absolute -top-10 -right-10 cursor-pointer"
              src="/images/close-x-circled.svg"
              alt="Close Icon"
              width={48}
              height={48}
            />

            <p className="text-lg font-medium text-center">
              Congratulations, order placed successfully!
            </p>

            <p className="text-xl font-bold text-center">
              Please select payment option.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
              <div
                onClick={() => paymentHandler('crypto')}
                className="bg-white border rounded text-black hover:bg-black hover:text-white px-4 py-2 cursor-pointer font-bold"
              >
                Crypto Payment
              </div>

              <div
                onClick={() => paymentHandler('interac')}
                className="bg-white border rounded text-black hover:bg-black hover:text-white px-4 py-2 cursor-pointer font-bold"
              >
                Interac Payment
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}