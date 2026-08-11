import { NextResponse } from 'next/server';
import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { getAuthUser } from "@/lib/auth";



// get orders for customer 
export async function GET(request) {




  try {
    await connectMongo();
    const user = await getAuthUser();
    // console.log("user", user)

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // console.log("Params", page,limit)

    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find({user: user.id})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.find({user: user.id}).countDocuments()
    ]);

    
    return NextResponse.json({
      success: true,
      orders,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
    

  } catch (error) {
    console.error('[ORDERS_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }




}
