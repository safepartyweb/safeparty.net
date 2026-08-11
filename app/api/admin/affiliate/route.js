import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import Affiliate from '@/models/Affiliate';
import { requireAdmin } from "@/lib/AdminAuth";

export async function GET() {
  try {
    await connectMongo();

    const user = await requireAdmin();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const affiliates = await Affiliate.find()
      .select('-password') // exclude password
      .sort({ createdAt: -1 });

    return NextResponse.json({ affiliates });
  } catch (error) {
    console.error('Error fetching affiliates:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
