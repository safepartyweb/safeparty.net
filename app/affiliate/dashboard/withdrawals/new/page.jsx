'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewWithdrawalPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return alert('Enter a valid amount');

    try {
      setLoading(true);
      const res = await axios.post('/api/affiliates/withdraw', { amount });
      console.log("withdrawal req res", res)
      if (res.status === 200) {
        alert('Withdrawal request submitted!');
        router.push('/affiliate/dashboard/withdrawals');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to request withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Request Withdrawal</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">
          Amount
          <input
            type="number"
            className="w-full border p-2 mt-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 mt-3"
          disabled={loading}
        >
          {loading ? 'Requesting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
