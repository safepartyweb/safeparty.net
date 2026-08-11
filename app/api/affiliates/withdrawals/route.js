// /app/api/affiliate/withdrawals/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import AffiliateWithdrawal from '@/models/AffiliateWithdrawal';

export async function GET() {
  await connectMongo();
  const user = await getAuthUser();

  if (!user || user.role !== 'affiliate') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const withdrawals = await AffiliateWithdrawal.find({ affiliate: user.id }).sort({ createdAt: -1 });

  // console.log("withdrawals",withdrawals)



  return NextResponse.json({withdrawals});
}
