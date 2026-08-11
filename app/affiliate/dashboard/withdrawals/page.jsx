'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Link from 'next/link';

export default function WithdrawalListPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await axios.get('/api/affiliates/withdrawals');
        // console.log("res",res)
        setWithdrawals(res.data.withdrawals);
      } catch (err) {
        console.error('Error fetching withdrawals', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  if(loading) return <Loader />
  // console.log("withdrawals",withdrawals)

  return (
    <div className="max-w-4xl mx-auto p-4">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold ">Withdrawal Requests</h1>
        <Link className='bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer' href="/affiliate/dashboard/withdrawals/new">Request withdraw</Link>

      </div>
      
      
     
      
      { withdrawals.length === 0 ? (
        <p>No withdrawal requests found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Requested At</th>
              <th className="p-2 border">Processed At</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w._id}>
                <td className="p-2 border">${w.amount}</td>
                <td className="p-2 border capitalize">{w.status}</td>
                <td className="p-2 border">
                  {new Date(w.requestedAt).toLocaleString()}
                </td>
                <td className="p-2 border">
                  {w.processedAt
                    ? new Date(w.processedAt).toLocaleString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      


    </div>
  );
}
