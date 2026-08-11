'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminAffiliateList() {
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const res = await axios.get('/api/admin/affiliate');
        console.log("Affiliates res", res)
        setAffiliates(res.data.affiliates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAffiliates();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold ">Affiliate Users</h1>
        <Link className='bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer' href="/admin/affiliates/withdrawals">See withdrawals requests</Link>
      </div>
      
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total Referred</th>
            <th className="p-2 border">Commission Earned</th>
            <th className="p-2 border">Pending Withdraw</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.map((a) => (
            <tr key={a._id}>
              <td className="p-2 border">{a.name || '—'}</td>
              <td className="p-2 border">{a.referredCustomers.length}</td>
              <td className="p-2 border">${a.totalEarned.toFixed(2)}</td>
              <td className="p-2 border">${a.pendingWithdraw.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
