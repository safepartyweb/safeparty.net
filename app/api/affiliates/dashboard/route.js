// /app/api/affiliate/dashboard/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import Affiliate from '@/models/Affiliate';
import Customer from '@/models/Customer';
import Order from '@/models/Orders';

export async function GET() {
  await connectMongo();

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const affiliate = await Affiliate.findById(user._id);
  if (!affiliate) {
    return NextResponse.json({ message: 'Affiliate not found' }, { status: 404 });
  }

  // Fetch referred customers and orders
  const referredCustomers = await Customer.find({ referredBy: affiliate._id }).select('_id');
  const referredCustomerIds = referredCustomers.map(c => c._id);

  const referredOrders = await Order.find({ customer: { $in: referredCustomerIds } });

  return NextResponse.json({
    name: user.name,
    email: user.email,
    referralCode: affiliate.referralCode,
    currentBalance: affiliate.currentBalance,
    totalCustomers: referredCustomers.length,
    totalOrders: referredOrders.length,
    recentOrders: referredOrders.slice(-5).reverse(), // latest 5
  });
}
