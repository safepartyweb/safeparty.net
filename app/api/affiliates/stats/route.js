import connectMongo from '@/lib/db';
import Affiliate from '@/models/Affiliate';

import { getAuthUser } from '@/lib/auth';

export async function GET(req) {
  await connectMongo();
  const user = await getAuthUser(req);
  if (!user) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  // console.log("user",user)

  const affiliate = await Affiliate.findById(user.id);
  if (!affiliate) {
    return new Response(JSON.stringify({ message: 'Affiliate account not found' }), { status: 404 });
  }

  const environment = process.env.NODE_ENV
  let baseUrl;
  if(environment == 'development'){
    baseUrl = process.env.NEXT_DEV_BASE_URL
  }else {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  }

  const referralLink = `${baseUrl}/?ref=${affiliate.affiliateCode}`;

  return new Response(JSON.stringify({
    referralLink,
    totalEarned: affiliate.totalEarned || 0,
    currentBalance: affiliate.currentBalance || 0,
  }));
}
