import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { NextResponse } from 'next/server';
import { getAuthUser } from "@/lib/auth";
import Customer from "@/models/Customer";


// get all orders for customer
export async function GET() {

  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  console.log("user", user)
  await connectMongo();

  try {
    const orders = await Order.find({user:user.id}).sort({ createdAt: -1 }).limit(5);;
    // if(orders.length == 0){
    //   throw new Error('No order found!')
    // }
    return Response.json({ message: "Success!", orders }, { status: 200 });
  } catch (error) {
    console.log("Error:", error)
    return Response.json({ message: "Failed!", error }, { status: 500 });
  }

  
}

