'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '@/components/Loader';


export default function AffiliateDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsRes = await axios.get('/api/affiliates/stats');
        const ordersRes = await axios.get('/api/affiliates/orders');
        setStats(statsRes.data);
        setOrders(ordersRes.data);
        console.log("statsRes", statsRes)
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // if (loading) return <p className="text-center py-10">Loading dashboard...</p>;
  if (loading) return <Loader />;

  // console.log("Orders", orders)
  console.log("stats", stats)
  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Affiliate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Referral Link</h2>
          <p className="break-words text-blue-600 font-medium">{stats?.referralLink}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Total Earned</h2>
          <p className="text-lg font-bold">${stats?.totalEarned?.toFixed(2)}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-gray-500">Current Balance</h2>
          <p className="text-lg font-bold text-green-600">${stats?.currentBalance?.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Referred Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Commission</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.customerName || 'N/A'}</td>
                  <td className="px-4 py-2">${order?.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-green-600">
                    ${(order.total * 0.1).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">No referred orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
