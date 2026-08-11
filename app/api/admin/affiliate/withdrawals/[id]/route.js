// /app/api/admin/affiliate/withdrawals/[id]/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import { requireAdmin } from '@/lib/AdminAuth';
import AffiliateWithdrawal from '@/models/AffiliateWithdrawal';
import Affiliate from '@/models/Affiliate';


export async function PATCH(req, { params }) {
  await connectMongo();
  const user = await requireAdmin();

  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const param = await params;
  const { id } = await param;
  const { status } = await req.json(); // 'approve' or 'reject'

  console.log("request data", id, status)


  const withdrawal = await AffiliateWithdrawal.findById(id);
  if (!withdrawal) {
    return NextResponse.json({ message: 'Withdrawal not found' }, { status: 404 });
  }

  if (withdrawal.status !== 'pending') {
    return NextResponse.json({ message: 'Already processed' }, { status: 400 });
  }

  if (status === 'approved') {
    withdrawal.status = 'approved';
    withdrawal.processedAt = new Date();
    await withdrawal.save();
    return NextResponse.json({ message: 'Withdrawal approved' });
  } else if (status === 'rejected') {
    // Refund balance
    const affiliate = await Affiliate.findById(withdrawal.affiliate);
    affiliate.currentBalance += withdrawal.amount;
    await affiliate.save();

    withdrawal.status = 'rejected';
    withdrawal.processedAt = new Date();
    await withdrawal.save();
    return NextResponse.json({ message: 'Withdrawal rejected and refunded' });
  } else {
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }
}
