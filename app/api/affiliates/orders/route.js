import connectMongo from '@/lib/db';
import Order from '@/models/Orders';
import Affiliate from '@/models/Affiliate';
import { User } from '@/models/User';
import { getAuthUser } from '@/lib/auth';

export async function GET(req) {
  await connectMongo();
  const user = await getAuthUser(req);
  if (!user) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const affiliate = await Affiliate.findById(user.id);
  if (!affiliate) {
    return new Response(JSON.stringify({ message: 'Affiliate account not found' }), { status: 404 });
  }

  const orders = await Order.find({ referredBy: affiliate._id }).sort({ createdAt: -1 }).populate('user');

  const orderData = orders.map(order => ({
    _id: order._id,
    total: order.itemsPrice,
    createdAt: order.createdAt,
    customerName: order.user?.fullName || 'N/A',
  }));

  return new Response(JSON.stringify(orderData));
}
