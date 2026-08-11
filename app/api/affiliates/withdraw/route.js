// /app/api/affiliate/withdraw/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import Affiliate from '@/models/Affiliate';
import { getAuthUser } from '@/lib/auth';
import AffiliateWithdrawal from '@/models/AffiliateWithdrawal';


export async function POST(req) {
  await connectMongo();
  const user = await getAuthUser();

  if (!user || user.role !== 'affiliate') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { amount } = await req.json();
  if (!amount || amount <= 0) {
    return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
  }

  const affiliate = await Affiliate.findById(user.id);

  if (!affiliate || affiliate.currentBalance < amount) {
    return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 });
  }

  const withdrawal = await AffiliateWithdrawal.create({
    affiliate: user.id,
    amount,
    status: 'pending',
    requestedAt: new Date(),
  });

  // affiliate.currentBalance -= amount;
  // affiliate.pendingWithdraw += amount;

  await Affiliate.findByIdAndUpdate(user.id, {
    $inc: {
      currentBalance: -amount,
      pendingWithdraw: amount,
    }
  });




  return NextResponse.json({ message: 'Withdrawal requested', withdrawal });
}
