'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '@/components/Loader';

export default function AdminWithdrawalsPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get('/api/admin/affiliate/withdrawals');
      setWithdrawals(res.data.withdrawals);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    setIsLoading(false)
    
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/api/admin/affiliate/withdrawals/${id}`, {
        status: newStatus,
      });

      console.log(" updateStatus res",res)
      fetchWithdrawals(); // refresh list
    } catch (err) {
      console.error('Failed to update withdrawal:', err);
    }
  };

  if(isLoading ) return <Loader />

  // console.log("withdrawals",withdrawals)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Withdrawals</h1>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Affiliate</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Requested</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w) => (
            <tr key={w._id}>
              <td className="p-2 border">{w.affiliate.name || 'N/A'}</td>
              <td className="p-2 border">${w.amount}</td>
              <td className="p-2 border capitalize">{w.status}</td>
              <td className="p-2 border">
                {new Date(w.requestedAt).toLocaleString()}
              </td>
              <td className="p-2 border space-x-2">
                {w.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(w._id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(w._id, 'rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
                {w.status !== 'pending' && (
                  <span className="text-gray-500">{w.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
