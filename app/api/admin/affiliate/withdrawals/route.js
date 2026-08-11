// /app/api/admin/affiliate/withdrawals/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import { requireAdmin } from '@/lib/AdminAuth';
import AffiliateWithdrawal from '@/models/AffiliateWithdrawal';

export async function GET() {
  await connectMongo();
  const user = await requireAdmin();

  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const withdrawals = await AffiliateWithdrawal.find()
    .populate('affiliate', 'name email')
    .sort({ createdAt: -1 });

  return NextResponse.json({withdrawals});
}
